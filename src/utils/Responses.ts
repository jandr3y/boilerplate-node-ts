import { response, Response } from "express";

export default class Responses {
  static badRequest(message: string, response: Response) {
    return response.status(400).json({
      error: true,
      message
    })
  }

  static notFound(message: string, response: Response) {
    return response.status(404).json({
      error: true,
      message
    })
  }

  static internal(message: string, response: Response) {
    return response.status(400).json({
      error: true,
      message
    })
  }

  static unauthorized(response: Response) {
    return response.status(401).json({
      error: true,
      message: 'Acesso não permitido'
    });
  }
}