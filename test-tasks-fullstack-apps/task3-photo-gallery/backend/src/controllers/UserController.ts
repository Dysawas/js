import UserService from "../services/UserService"
import { Request, Response } from "express";

class UserController {
    async getAll(req: Request, res: Response) {
       const users = await UserService.getAllUsers()
       res.send(users)
    }

    async getOne(req: Request, res: Response) {
        const {id} = req.params
        const user = await UserService.getOneUser(+id)
        res.send(user)
    }

    async create(req: Request, res: Response) {
        try {
            const user = req.body
            const createdUser = await UserService.createUser(user)
            res.send(createdUser)
        } catch (error) {
            res.status(500).send(error)
        }
       
    }

    async update(req: Request, res: Response) {
        const {id} = req.params
        const user = req.body
        const updatedUser = await UserService.updateUser(+id, user)
        res.send(updatedUser)
    }

    async delete(req: Request, res: Response) {
        const {id} = req.params
        const deletedUser = await UserService.deleteUser(+id)
        res.send(deletedUser)
    }

}

export default new UserController()