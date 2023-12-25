import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Contact } from "../models/Contact";
import ContactService from "../services/ContactService";
import { Request, Response } from "express";

class ContactController {
  async getAll(req: Request, res: Response) {
    try {
      const contacts = await ContactService.getAll();
      res.json(contacts);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const contacts = await ContactService.getOne(+id);
      res.json(contacts);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async create(req: Request, res: Response) {
    try {
      const body: Contact = req.body;
      const contact = await ContactService.create(body);
      res.json(contact);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const body: Contact = req.body;
      const result = await ContactService.update(+id, body);
      res.json(result);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await ContactService.delete(+id);
      res.json(result);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}

export default new ContactController();
