import { Router } from 'express';
import { UserController } from './user.controller.js';
import { validate } from '../../middlewares/validate.js';
import { auth } from '../../middlewares/auth.js';
import { isSelfOr, requirePermission } from '../../middlewares/permissions.js';

export const userRoutes = Router();
userRoutes.use(auth);

userRoutes.get('/:id', validate(UserController.idParams, 'params'), isSelfOr('users:read'), UserController.getById);
userRoutes.get('/', requirePermission('users:list'), UserController.list);
userRoutes.post('/:id/block', validate(UserController.idParams, 'params'), isSelfOr('users:block'), UserController.block);
