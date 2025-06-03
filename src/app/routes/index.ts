import { Router } from 'express';
import { UserRoutes } from '../modules/User/user.routes';
import { AuthRoutes } from '../modules/Auth/auth.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/user',
    router: UserRoutes,
  },
  {
    path: '/auth',
    router: AuthRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.router));

export default router;
