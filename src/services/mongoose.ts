import { Application, NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import MongoError from "../errors/MongoError";
import { MONGO_DNS } from "../settings";

/**
 * Conectar ao mongoDB e tratar possíveis erros de conexão,
 * 
 */
export default (app: Application) => {
  
  app.use((request: Request, response: Response, next: NextFunction) => {
    mongoose.connection.on('error', error => {
      return response.status(500).json({
        error: true,
        message: 'Houve um erro ao se conectar com o banco de dados'
      });
    });

    next();
  });

  mongoose.set('useCreateIndex', true);
  mongoose.connect(MONGO_DNS, { useNewUrlParser: true, useUnifiedTopology: true });
  
  return;
}