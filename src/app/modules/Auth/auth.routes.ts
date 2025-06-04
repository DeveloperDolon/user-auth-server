import express from 'express';
import { AuthController } from './auth.controller';

const router = express.Router();

router.post('/login', AuthController.login);

router.get('/me', AuthController.me);

router.post('/verify', AuthController.verify);

export const AuthRoutes = router;
