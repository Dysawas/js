import { DataTypes, Model } from "sequelize";
import db from "../db";
import { UserType } from "../types/userTypes";
import Image from "./Image";

export class User extends Model<UserType> {
  declare id: number;
  declare login: string;
  declare email: string;
  declare password: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    login: {
      type: DataTypes.STRING(128),
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize: db,
    modelName: "User",
    tableName: "users",
  }
);

User.hasMany(Image, { foreignKey: { name: "userId" }});
Image.belongsTo(User, { foreignKey: { name: "userId" } });

export default User;
