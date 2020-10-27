import { NextFunction, Request, Response } from "express";
import AuthUtils from "../utils/Auth";
import Responses from "../utils/Responses";

export const Permissions = {
  logged: (request: Request, response: Response, next: NextFunction) => {
    
    const { authorization } = request.headers;
    
    if ( authorization && typeof authorization === 'string' ) {
    
      const auth = authorization.split(' ');

      const token: string = auth[1];
      const decoded = AuthUtils.jwtDecode(token);

      if ( decoded ) {
        request.auth = decoded;  
        next();
      } else {
        return Responses.unauthorized(response);  
      }

    } else {
      return Responses.unauthorized(response);
    }
  }
}