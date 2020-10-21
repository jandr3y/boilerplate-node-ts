import { NextFunction, Request, Response, Router } from "express";
import MongoError from "../errors/MongoError";
import User from "../models/User";

const router: Router = Router();

/**
 * POST /auth/simple
 * 
 * Autenticação simples de usuário por email e senha
 */
router.post('/', async (request: Request, response: Response, next: NextFunction) => {
  
})

router.get('/', async (request: Request, response: Response, next: NextFunction) => {
  try {
    const users = await User.find();
    return response.status(200).json(users);
  } catch ( error ) {
    throw new MongoError(error);
  }
})


export const UserRoutes: Router = router;