import express from "express"
import cors from "cors"
import userRouter from "./Routes/user.js"

const app = express()

app.use(express.json())
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))
app.use("/", userRouter)

app.listen(8800)