import {Router} from "express"
import UserController from "../controllers/UserController"

export const userRouter = Router()

userRouter.get("/users", UserController.getAll)
userRouter.get("/users/:id", UserController.getOne)
userRouter.post("/users", UserController.create)
userRouter.put("/users/:id", UserController.update)
userRouter.delete("/users/:id", UserController.delete)