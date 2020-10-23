import { Application, NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { MONGO_DNS } from "../settings";
import Responses from "../utils/Responses";

/**
 * Conectar ao mongoDB e tratar possíveis erros de conexão,
 * 
 */
export default (app: Application) => {
  
  app.use((request: Request, response: Response, next: NextFunction) => {
    mongoose.connection.on('error', error => {
      Responses.internal('Houve um erro ao conectar com o banco de dados.', response);
    });

    next();
  });

  mongoose.set('useCreateIndex', true);
  mongoose.connect(MONGO_DNS, { useNewUrlParser: true, useUnifiedTopology: true });
  
  return;
}