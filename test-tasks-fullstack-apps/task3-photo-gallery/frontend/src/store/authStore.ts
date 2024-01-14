import { makeAutoObservable } from "mobx";
import { User, UserCreate, UserLogin } from "../models/models";

export class AuthStore {
  private readonly API_URL = "http://localhost:5000/api";
  users: User[] = [];
  currentUserId: number = 0;
  isAuth: boolean = localStorage.getItem("auth") == "true" ? true : false;

  constructor() {
    makeAutoObservable(this);

    this.getAllUsers = this.getAllUsers.bind(this);
    this.registration = this.registration.bind(this);
    this.login = this.login.bind(this);
  }

  async getAllUsers() {
    const result: Response = await fetch(`${this.API_URL}/users`);
    if (result.ok) {
      this.users = await result.json();
    }
  }

  async login(user: UserLogin) {
    const result: Response = await fetch(`${this.API_URL}/auth/${user.login}&${user.password}`, {
        method: "GET",
      }
    );
    if (result.ok) {
      this.isAuth = await result.json();
      this.currentUserId = this.users.find(u => u.login === user.login)?.id!
      return this.isAuth;
    }
  }

  async registration(user: UserCreate) {
    const result: Response = await fetch(`${this.API_URL}/auth`, {
      method: "POST",
      body: JSON.stringify(user),
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (result.ok) {
      const user: User = await result.json();
      this.users.push(user);
    }
  }
}

export const authStore = new AuthStore();
