import { json, response } from "express"
import { dataBase } from "../db.js"
import * as jose from 'jose'

export const getUsers = async (request, response, next) => {
  const q = "SELECT * FROM user"
  dataBase.query(q, (err, data) => {
    if (err) return response.json(err)
    return response.status(200).json(data)
  })
}

export const newUser = (request, response) => {
  const q = "INSERT INTO user (`username`, `cpf`, `email`, `password`, `age`) VALUES (?)"
  const values = [
    request.body.username,
    request.body.cpf,
    request.body.email,
    request.body.password,
    request.body.age,
  ]
  dataBase.query(q, [values], (err) => {
    if (err) return response.json(err);
    return response.status(200).json("Usuário criado com sucesso.")
  })
}

export const deleteUser = async (request, response) => {
  const q = "DELETE FROM user WHERE id = ?"
  const userId = request.params.id
  dataBase.query(q, [userId], (err, result) => {
    if (err) return response.json(err)
    if (result.affectedRows === 0) {
      return response.status(404).json({ success: false, message: "Usuário não encontrado." })
    }
    return response.status(200).json({ success: true, message: "Usuário deletado com sucesso." })
  })
}

export const updateUser = async (request, response) => {
  const userExists = await getUserById(request.body.id)
  if (!userExists) {
    return response.status(404).json({ success: false, message: "Usuário não encontrado." })
  }
  if (userExists.password !== request.body.password) {
    return response.status(401).json({ success: false, message: "Credenciais invalidas." })
  }
  const q = "UPDATE user SET username = ?, email = ?, age = ?, password = ? WHERE id = ?"
  const values = [
    request.body.username,
    request.body.email,
    request.body.age,
    request.body.newPassword || request.body.password,
    request.body.id,
  ]
  dataBase.query(q, values, (err, result) => {
    if (err) return response.json(err)
    if (result.affectedRows === 0) {
      return response.status(404).json({ success: false, message: "Usuário não encontrado." })
    }
    return response.status(200).json({ success: true, message: "Usuário atualizado com sucesso." })
  });
}

export const signIn = async (request, response) => {
  const q = "SELECT * FROM user WHERE email = ? AND password = ?"
  if (!request || !response) return
  if (!request.body) return response?.status?.(400).json({ success: false, message: "Missing request body." })

  const values = [
    request.body.email,
    request.body.password
  ]

  dataBase.query(q, values, async (err, data) => {
    if (err) return response.json(err)
    if (data.length === 0) {
      return response.status(401).json({ success: false, message: "Usuário ou senha inválidos." })
    }

    const user = data[0]
    const secret = new TextEncoder().encode(
      'cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2',
    )
    const jwt = await new jose.SignJWT({ userId: user.id, email: user.email })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setIssuer(user.email)
      .setAudience('urn:example:audience')
      .setExpirationTime('2h')
      .sign(secret)

    return response.status(200).json({
      success: true,
      message: "Login realizado com sucesso.",
      user: user,
      token: jwt
    })
  })
}

export const isUserAuthenticated = async (request, response, next) => {
  const authHeader = request.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return response.status(401).json({ success: false, message: "Token não fornecido." })
  }
  const token = authHeader.split(' ')[1]
  const secret = new TextEncoder().encode(
    'cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2',
  )
  try {
    const { payload } = await jose.jwtVerify(token, secret, {
      audience: 'urn:example:audience'
    })
    const q = "SELECT * FROM user WHERE id = ?"
    dataBase.query(q, [payload.userId], (err, data) => {
      if (err || data.length === 0) {
        return response.status(401).json({ success: false, message: "Usuário não encontrado." })
      }
      request.user = data[0]
      next()
    })
  } catch (e) {
    return response.status(401).json({ success: false, message: "Token inválido ou expirado." })
  }
}

const verifyIsSamePassword = (password, anotherPassword) => {
  return password === anotherPassword ? true : false
}

const getUserById = (id) => {
  const q = "SELECT * FROM user WHERE id = ?"
  return new Promise((resolve) => {
    dataBase.query(q, [id], (err, results) => {
      if (err) return resolve(null)
      if (!results || results.length === 0) return resolve(null)
      return resolve(results[0])
    })
  })
}