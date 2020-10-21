import express, { Application } from "express";
import { Routes } from "./routes";
import { LoggerMiddleware } from "./middlewares/LoggerMiddleware";
import ErrorHandler from "./errors";
import connectDatabase from "./services/mongoose";

export default class App {

  private app: Application;

  public constructor() {
    this.app = express();

    connectDatabase(this.app);
    
    this.registerMiddlewares();

    this.app.use('/', Routes);

    this.app.use(ErrorHandler);
  }

  public listen() {
    this.app.listen(3000, () => {
      console.log('Servidor Rodando')
    })
  }

  private registerMiddlewares() {
    LoggerMiddleware(this.app);
  }
}