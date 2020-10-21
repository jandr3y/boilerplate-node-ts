import { NextFunction, Request, Response, Router } from "express";
import User, { IUser } from "../models/User";

const router: Router = Router();

/**
 * POST /users
 * 
 * Create a single user and return jwt payload
 */
router.post('/', async (request: Request, response: Response, next: NextFunction) => {
  
  const userRequest = request.body as IUser;
  const user = new User(userRequest);

  user.role = 1;

  try {
    await user.validate();
    await user.save();

    return response.status(200).json({ id: user._id });
  } catch ( error ) {
    next(error);
  }

})

/**
 * GET /users
 * 
 * Returns simple users data
 */
router.get('/', async (request: Request, response: Response, next: NextFunction) => {

  try {

    const users = await User.find();
    return response.status(200).json(users);

  } catch ( error ) {
    next(error);
  }

})


export const UserRoutes: Router = router;