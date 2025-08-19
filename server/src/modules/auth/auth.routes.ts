import { Router } from 'express';
import { AuthController } from './auth.controller.js';
import { validate } from '../../middlewares/validate.js';

export const authRoutes = Router();

authRoutes.post('/register', validate(AuthController.registerSchema), AuthController.register);
authRoutes.post('/login', validate(AuthController.loginSchema), AuthController.login);
