import ImageService from "../services/ImageService"
import { Request, Response } from "express";

class ImageController {
    async getAll(req: Request, res: Response) {
       const images = await ImageService.getAllImages()
       res.send(images)
    }

    async getOne(req: Request, res: Response) {
        const {id} = req.params
        const image = await ImageService.getOneImage(+id)
        res.send(image)
    }

    async create(req: Request, res: Response) {
        console.log(req.body)
        console.log(req.body.userId)
        try {
            const image = req.body
            const createdImage = await ImageService.createImage(image)
            res.send(createdImage)
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
      
    }

    async update(req: Request, res: Response) {
        const {id} = req.params
        const image = req.body
        const updatedImage = await ImageService.updateImage(+id, image)
        res.send(updatedImage)
    }

    async delete(req: Request, res: Response) {
        const {id} = req.params
        const deletedImage = await ImageService.deleteImage(+id)
        res.send(deletedImage)
    }

}

export default new ImageController()