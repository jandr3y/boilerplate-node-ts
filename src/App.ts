import express, { Application, Router } from "express";
import { Routes } from "./routes";

import { LoggerMiddleware } from "./middlewares/LoggerMiddleware";

export default class App {

  private app: Application;

  public constructor() {
    this.app = express();

    this.registerMiddlewares();
    this.app.use('/', Routes);
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