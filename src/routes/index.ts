import { Application, Router, Request, Response } from "express";
import { AuthRoutes } from "./AuthRoutes";
import { UserRoutes } from "./UserRoutes";

const router: Router = Router();

router.use('/auth', AuthRoutes);
router.use('/users', UserRoutes);

// Default Route
router.get('/', (request: Request, response: Response) => {
  response.send('Opa!');
});

export const Routes: Router = router;