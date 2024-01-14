import { makeAutoObservable } from "mobx";
import { Image, ImageCreate } from "../models/models";

export class ImageStore {
  private readonly API_URL = "http://localhost:5000/api";
  images: Image[] = [];
  constructor() {
    makeAutoObservable(this);
    this.getAllImages = this.getAllImages.bind(this)
    this.createImage = this.createImage.bind(this)
  }

  async getAllImages() {
    const result: Response = await fetch(`${this.API_URL}/images`);
    if (result.ok) {
      this.images = await result.json();
    }
  }

  async createImage(image: ImageCreate) {
    const result: Response = await fetch(`${this.API_URL}/images`, {
      method: "POST",
      body: JSON.stringify(image),
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (result.ok) {
      const createdImage: Image = await result.json();
      this.images.push(createdImage);
    }
  }

  async updateImage(id: number, image: Image) {
    const result: Response = await fetch(`${this.API_URL}/images/${id}`, {
      method: "PUT",
      body: JSON.stringify(image),
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (result.ok) {
      const updatedImage: Image = await result.json();
      this.images = this.images.map((i) =>
        i.id === updatedImage.id ? updatedImage : i
      );
    }
  }

  async deleteImage(id: number) {
    const result: Response = await fetch(`${this.API_URL}/images/${id}`, {
      method: "DELETE",
    });
    if (result.ok) {
      const deletedImage: Image = await result.json();
      this.images = this.images.filter((i) => i.id !== deletedImage.id);
    }
  }
}

export const imageStore = new ImageStore();
