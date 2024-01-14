import express, { json } from "express";
import db from "./db";
import "./models/User";
import "./models/Image";
import { rootRouter } from "./routes/rootRouter";
import cors from "cors";

const app = express();
const port = 5000;

app.use(cors());
app.use(json());
app.use("/api", rootRouter);


const start = async () => {
  console.log("Testing the database connection..");
  try {
    await db.authenticate();
    console.log("Connection has been established successfully.");
    await db.sync();
    console.log("All models were synchronized successfully.");
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

start();
