import { Model, DataTypes } from "sequelize";
import db from "../db";
import User from "./User";
import { ImageType } from "../types/imageTypes";

export class Image extends Model<ImageType> {
  declare id: number;
  declare content: string;
  declare extension: string;
  declare title: string;
  declare userId: number;
}

Image.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    extension: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize: db,
    modelName: "Image",
    tableName: "images",
  }
);

export default Image;
