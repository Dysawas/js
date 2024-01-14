import {Sequelize} from "sequelize"

const sequelize = new Sequelize("photo_gallery", "postgres", "12345", {
    host: "localhost",
    dialect: "postgres",
});

export default sequelize