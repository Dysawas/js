import { Image } from "../models/Image";
import User from "../models/User";
import { ImageType } from "../types/imageTypes";

class ImageService {
  async getAllImages(): Promise<ImageType[]> {
    return (await Image.findAll()).map((i) => ({
      id: i.id,
      title: i.title,
      content: i.content,
      extension: i.extension,
      userId: i.userId,
    }));
  }

  async getOneImage(id: number): Promise<ImageType | null> {
    const image = await Image.findByPk(id);
    return (
      image && {
        id: image.id,
        title: image.title,
        content: image.content,
        extension: image.extension,
        userId: image.userId,
      }
    );
  }

  async createImage(image: Image): Promise<ImageType> {
    const userFounded = await User.findOne({ where: { id: image.userId } });
    if (userFounded === null) throw new Error("User isn't exsist");

    const createImage = await Image.create(image);
    return {
      id: createImage.id,
      title: createImage.title,
      content: createImage.content,
      extension: createImage.extension,
      userId: createImage.userId,
    };
  }

  async updateImage(
    id: number,
    image: ImageType
  ): Promise<ImageType | undefined> {
    const imageFinded = await Image.findByPk(id);

    const updatedImage = await imageFinded?.update({
      title: image.title,
      content: image.content,
      extension: image.extension,
      userId: image.userId,
    });
    return (
      updatedImage && {
        id: updatedImage.id,
        title: updatedImage.title,
        content: updatedImage.content,
        extension: updatedImage.extension,
        userId: updatedImage.userId,
      }
    );
  }

  async deleteImage(id: number): Promise<ImageType | null> {
    const image = await Image.findByPk(id);
    await image?.destroy();
    return (
      image && {
        id: image.id,
        title: image.title,
        content: image.content,
        extension: image.extension,
        userId: image.userId,
      }
    );
  }
}

export default new ImageService();
