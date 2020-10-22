import { Response } from "express";

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
}