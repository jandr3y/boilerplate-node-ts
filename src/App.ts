import express, { Application } from "express";
import { Routes } from "./routes";
import { LoggerMiddleware } from "./middlewares/LoggerMiddleware";
import { errorHandler } from "./errors";
import connectDatabase from "./services/mongoose";
import bodyParser from "body-parser";
import cors from "cors";

export default class App {

  private app: Application;

  public constructor() {
    this.app = express();

    connectDatabase(this.app);

    // All middlewares before routes
    this.registerMiddlewares();

    this.app.use('/', Routes);

    // Error Handler
    this.app.use(errorHandler);
  }

  public listen() {
    this.app.listen(3000, () => {
      console.log('Servidor Rodando')
    })
  }

  private registerMiddlewares() {
    this.app.use(cors());
    this.app.use(bodyParser.urlencoded());
    this.app.use(bodyParser.json());
    LoggerMiddleware(this.app);
  }
}