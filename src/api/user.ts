import { api } from "@/lib/axios";
import type { promises } from "dns";

type UserBody = {
  id: number
  username: string
  cpf: string
  email: string
  password: string
  age: number
  isManager: boolean
}
export async function getUsers(): Promise<UserBody | null> {
  try {
    const result = await api.get<UserBody>("/user")
    return result.data
  } catch {
    return null
  }
}

type RegisterUserBody = {
  username: string
  cpf: string
  email: string
  age: number
  password: string
}
export async function registerUser(data:RegisterUserBody) {
  await api.post("/auth/signup", data)
}

type AuthenticateUserBody = {
  email: string
  password: string
}
export async function authenticateUser(data: AuthenticateUserBody): Promise<UserBody | null> {
  try{
    const result = await api.post("/auth/signin", data)
    return result.data
  } catch {
    return null
  }
}

type DeleteUserBody = {
  cpf: string
  email: string
  username: string
}
export async function deleteUser(data: DeleteUserBody) {
  await api.post("/deleteUser", data)
}