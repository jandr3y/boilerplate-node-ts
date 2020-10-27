import { NextFunction, Request, Response, Router } from "express";
import Responses from "../utils/Responses";
import User, { IUser } from "../models/User";
import Mailer from "../services/Mailer";
import AuthUtils from "../utils/Auth";
import Logger from "../utils/Logger";
import { Permissions } from "../middlewares/PermissionMiddleware";

const router: Router = Router();

/**
 * POST /users
 * 
 * Create a single user and return jwt payload
 */
router.post('/', async (request: Request, response: Response, next: NextFunction) => {
  
  const userRequest = request.body as IUser;
  const user = new User(userRequest);

  try {
    const userDuplicate = await User.findOne({ email: userRequest.email });

    if ( userDuplicate ) {
      return Responses.badRequest('Email já cadastrado', response);
    }
  } catch ( error ) {
    next(error);
  }

  user.activated = false;
  user.role = 1;
  user.confirmCode = AuthUtils.generateRandomCode();
  
  try {
    await user.validate();
    await user.save();
    await Mailer.send().activate(user.realname, user.email, user.confirmCode);
  } catch ( error ) {
    next(error);
  }
  
  Logger.info('Novo usuário cadastrado');

  response.status(200).json({
    token: AuthUtils.jwtEncode(user.getPayload())
  });
});

/**
 * GET /users
 * 
 * Returns simple users data
 */
router.get('/', async (request: Request, response: Response, next: NextFunction) => {

  try {

    const users = await User.find({}, 'realname');
    return response.status(200).json(users);

  } catch ( error ) {
    next(next);
  }

})

/**
 * POST /users/activate/{confirmCode}
 * 
 * Activate a user with the confirm code sent in the email
 */
router.post('/activate/:confirmCode', async (request: Request, response: Response, next: NextFunction) => {
  
  const { confirmCode } = request.params;

  if ( typeof confirmCode !== 'string' || confirmCode.length < 5 ) {
    return Responses.badRequest('O código de confirmação esta incorreto', response);
  }

  const oldUser = await User.findOne({ confirmCode });

  if ( oldUser ) {
    
    const updatedData = {
      activated: true,
      confirmCode: ''
    };

    try {
      const updatedUser = await User.findOneAndUpdate({ _id: oldUser._id }, updatedData);
      
      return response.status(200).json({
        token: AuthUtils.jwtEncode(updatedUser?.getPayload())
      });

    } catch ( error ) {
      next(error);
    }

  } else {
    return Responses.notFound('Conta não encontrada', response);
  }

});

export const UserRoutes: Router = router;