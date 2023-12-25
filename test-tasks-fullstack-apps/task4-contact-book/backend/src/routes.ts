import  { Router } from "express";
import ContactController from "./controllers/ContactController"

export const router = Router()

router.get("/contacts", ContactController.getAll)
router.get("/contacts/:id", ContactController.getOne)
router.post("/contacts", ContactController.create)
router.put("/contacts/:id", ContactController.update)
router.delete("/contacts/:id", ContactController.delete)