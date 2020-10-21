import { Application, Request, Response } from "express";
import mongoose from "mongoose";
import MongoError from "../errors/MongoError";
import { MONGO_DNS } from "../settings";

/**
 * Conectar ao mongoDB e tratar possíveis erros de conexão,
 * 
 */
export default async (app: Application) => {
  app.use((request: Request, response: Response) => {
    mongoose.connection.on('error', error => {
      return response.status(500).json({
        error: true,
        message: 'Houve um erro ao se conectar com o banco de dados'
      });
    }); 
  });

  try {
    mongoose.set('useCreateIndex', true);
    await mongoose.connect(MONGO_DNS, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true
    });
  } catch (error) {
    throw new MongoError(error);
  }
}