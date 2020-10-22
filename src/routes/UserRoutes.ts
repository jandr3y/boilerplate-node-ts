import { NextFunction, Request, Response, Router } from "express";
import Responses from "../utils/Responses";
import MongoError from "../errors/MongoError";
import User, { IUser } from "../models/User";
import Mailer from "../services/Mailer";
import { generateEmailCode } from "../utils/random";

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
    next(new MongoError(error));
  }

  user.role = 1;
  user.confirmCode = generateEmailCode();
  
  try {
    
    await user.validate();
    await user.save();
    await Mailer.send().activate(user.realname, user.email, user.confirmCode);
    
    return response.status(200).json({ id: user._id });

  } catch ( error ) {
    console.log(error);
    next(new MongoError(error));
  }

})

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
    next(new MongoError(error));
  }

})


export const UserRoutes: Router = router;