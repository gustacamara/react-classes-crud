import mysql from "mysql2"

export const dataBase = mysql.createConnection({
  host: "localhost",
  user: "docker",
  password: "password",
  database: "docker",
})