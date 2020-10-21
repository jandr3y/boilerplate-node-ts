import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

export default (error: any, request: Request, response: Response, next: NextFunction) => {

  response.json({
    error: true,
    message: 'Ops'
  })
}