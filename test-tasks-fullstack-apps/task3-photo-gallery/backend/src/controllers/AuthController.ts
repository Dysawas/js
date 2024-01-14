import UserService from "../services/UserService";
import { Request, Response } from "express";

class AuthController {
    async login(req: Request, res: Response) {
        try {
            const {login, password} = req.params
            const result = await UserService.isExsist(login, password)
            res.send(result)
        } catch (error) {
            res.status(500).send(error)
        }
    }

    async registration(req: Request, res: Response) {
        try {        
            console.log(req.body)
            const user = req.body
            const createdUser = await UserService.createUser(user)
            res.status(201).send(createdUser)
        } catch (error) {
            if(error instanceof Error) res.status(500).send(error.message)
        }
    }
}


export default new AuthController()