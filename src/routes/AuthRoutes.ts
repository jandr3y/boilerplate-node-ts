import { Request, Response, Router } from "express";

const router: Router = Router();

/**
 * POST /auth/simple
 * 
 * Autenticação simples de usuário por email e senha
 */
router.post('/simple', (request: Request, response: Response) => {
  
})


export const AuthRoutes: Router = router;