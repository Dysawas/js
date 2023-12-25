import { AppDataSource } from "./data-source"
import express, { Express, Request, Response, json } from "express";
import { router } from "./routes";
import cors from "cors"

AppDataSource.initialize().then(async () => {
  console.log("Data Source has been initialized!")
  app.listen("5000")
}).catch(error => console.log(error))


var app: Express = express();
app.use(json())
app.use(cors())
app.use("/api", router)


