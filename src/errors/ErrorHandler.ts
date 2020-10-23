import { Request, NextFunction, Response } from "express";

export const ErrorHandler = (error: any, request: Request, response: Response, next: NextFunction) => {
  console.log(error);
  response.json({
    error: true,
    message: error.message,
    stack: error
  })
}