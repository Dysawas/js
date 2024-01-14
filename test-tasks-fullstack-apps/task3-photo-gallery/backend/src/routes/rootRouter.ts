import {Router} from "express"
import { userRouter } from "./userRouter"
import { authRouter } from "./authRouter"
import { imageRouter } from "./imageRouter"

export const rootRouter = Router()

rootRouter.use(userRouter)
rootRouter.use(authRouter)
rootRouter.use(imageRouter)