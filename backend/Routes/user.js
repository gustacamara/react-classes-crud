import express from "express"
import { deleteUser, getUsers, newUser, signIn, updateUser, isUserAuthenticated } from "../Controllers/user.js"

const router = express.Router()
router.get("/user",isUserAuthenticated, getUsers)
router.post("/auth/signup", newUser)
router.post("/auth/signin", signIn)
router.delete("/user/:id", isUserAuthenticated, deleteUser)
router.put("/updateUser", isUserAuthenticated, updateUser)

export default router