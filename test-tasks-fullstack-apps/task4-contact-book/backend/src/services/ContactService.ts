import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Contact } from "../models/Contact";
import { FormError } from "../interfaces/interfaces";


class ContactService {
  private contactRepository: Repository<Contact> = null;

  constructor() {
    this.contactRepository = AppDataSource.getRepository(Contact);
  }

  async getAll() {
    const contacts: Contact[] = await this.contactRepository.find();
    if (contacts) {
      return contacts;
    } else {
      throw new Error("Can't get all contacts");
    }
  }

  async getOne(id: number) {
    if (!id) {
      throw new Error("ID not specified");
    }
    const contact: Contact = await this.contactRepository.findOneBy({ id });
    return contact;
  }

  async create(contact: Contact) {
    const errors = this.validate(contact);
    if (errors.length) throw new Error(JSON.stringify(errors));

    const createdContact = await this.contactRepository.save(contact);
    if (createdContact) {
      return createdContact;
    } else {
      throw new Error("Can't create contact");
    }
  }

  async update(id: number, contact: Contact) {
    if (!id) {
      throw new Error("ID not specified");
    }

    const errors = this.validate(contact);
    if (errors.length) throw new Error(JSON.stringify(errors));

    const foundedContact: Contact = await this.contactRepository.findOneBy({
      id,
    });
    foundedContact.name = contact.name;
    foundedContact.phoneNumber = contact.phoneNumber;

    const updatedContact = await this.contactRepository.save(foundedContact);
    if (updatedContact) {
      return updatedContact;
    } else {
      throw new Error("Can't update contact");
    }
  }

  async delete(id: number) {
    if (!id) {
      throw new Error("ID not specified");
    }
    const foundedContact: Contact = await this.contactRepository.findOneBy({
      id,
    });
    const result: Contact = await this.contactRepository.remove(foundedContact);
    return result;
  }

  private validate(contact: Contact): FormError[] {
    const regexName: RegExp =
      /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u;
    const regexPhoneNumber: RegExp =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

    const errors = [
      {
        field: "name",
        isError: !regexName.test(contact.name),
        description: "Input name isn't correct!",
      },
      {
        field: "phoneNumber",
        isError: !regexPhoneNumber.test(contact.phoneNumber),
        description: "Input phone number isn't correct!",
      },
    ];

    return errors.filter((err) => err.isError);
  }
}

export default new ContactService();
