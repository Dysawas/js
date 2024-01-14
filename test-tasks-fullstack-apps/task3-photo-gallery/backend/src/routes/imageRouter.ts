import {Router} from "express"
import ImageController from "../controllers/ImageController"

export const imageRouter = Router()

imageRouter.get("/images", ImageController.getAll)
imageRouter.get("/images/:id", ImageController.getOne)
imageRouter.post("/images", ImageController.create)
imageRouter.put("/images/:id", ImageController.update)
imageRouter.delete("/images/:id", ImageController.delete)