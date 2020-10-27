import { NextFunction, Request, Response, Router } from "express";
import User from "../models/User";
import AuthUtils from "../utils/Auth";
import Responses from "../utils/Responses";

const router: Router = Router();

/**
 * POST /auth/simple
 * 
 * Autenticação simples de usuário por email e senha
 */
router.post('/simple', async (request: Request, response: Response, next: NextFunction) => {

  const { email, password } = request.body;

  if ( typeof email === 'string' && typeof password === 'string' )  {
    const user = await User.findOne({ email: email });

    if ( !user ) {
      return Responses.unauthorized(response);
    }

    try {

      if ( await AuthUtils.passwordIsEqual(password, user.password) ) {
        return response.status(200).json({
          token: AuthUtils.jwtEncode(user.getPayload())
        });
      } else {
        return Responses.unauthorized(response);
      }

    } catch ( error ) {
      next(error);
    }
  } else {
    return Responses.badRequest('Informe o campo email e senha', response);
  }
});


export const AuthRoutes: Router = router;