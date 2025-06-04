import express from 'express';
import { AuthController } from './auth.controller';

const router = express.Router();

router.post('/login', AuthController.login);

router.get('/me', AuthController.me);

export const AuthRoutes = router;
