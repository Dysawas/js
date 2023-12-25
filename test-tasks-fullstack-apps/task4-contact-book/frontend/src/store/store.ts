import { makeAutoObservable } from "mobx"
import { IContact } from "../models/contactModel"


class ContactStore {
    contacts: IContact[] = []
    private readonly URL = "http://localhost:5000"

    constructor(){
        makeAutoObservable(this)

        this.fetchContacts = this.fetchContacts.bind(this)
        this.addContact = this.addContact.bind(this)
        this.updateContact = this.updateContact.bind(this)
        this.removeContact = this.removeContact.bind(this)
    }

    get reverseContacts() {
        return this.contacts.slice().reverse()
    }

    async fetchContacts() {
        await fetch(`${this.URL}/api/contacts`, {
            method: "GET", 
            headers: {"Content-Type": "application/json"}
        })
        .then(res => {
            if(res.ok) return res.json() 
            else throw new Error(res.statusText)})
        .then(json => this.contacts = json)
        .catch(error => console.log(error))
    }

    async addContact(contact: IContact) {
        await fetch(`${this.URL}/api/contacts`, {
            method: "POST", 
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(contact)
        })
        .then(res => {
            if(res.ok) return res.json() 
            else throw new Error(res.statusText)})
        .then(json => this.contacts.push(json))
        .catch(error => console.log(error))
    }
    
    async updateContact(id: number, contact: IContact) {
        await fetch(`${this.URL}/api/contacts/${id}`, {
            method: "PUT", 
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(contact)
        })
        .then(res => {
            if(res.ok) return res.json() 
            else throw new Error(res.statusText)})
        .then(json => this.contacts = this.contacts.map(c => c.id === json.id ? json : c))
        .catch(error => console.log(error)) 
    }

    async removeContact(id: number) {
        await fetch(`${this.URL}/api/contacts/${id}`, {
            method: "DELETE", 
            headers: {"Content-Type": "application/json"},
        })
        .then(res => {
            if(res.ok) return res.json() 
            else throw new Error(res.statusText)})
        .then(json => this.contacts = this.contacts.filter(c => c.id !== id))
        .catch(error => console.log(error)) 
    }
}

export default new ContactStore()