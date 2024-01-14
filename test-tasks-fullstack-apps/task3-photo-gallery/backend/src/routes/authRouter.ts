import {Router} from "express"
import AuthController from "../controllers/AuthController"

export const authRouter = Router()

authRouter.get("/auth/:login&:password", AuthController.login)
authRouter.post("/auth", AuthController.registration)