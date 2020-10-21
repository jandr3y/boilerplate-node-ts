import { Request, NextFunction, Response } from "express";

export const errorHandler = (err: any, request: Request, response: Response, next: NextFunction) => {
  response.json({
    error: true,
    message: 'Ops',
    stack: err
  })
}