import { AppDataSource } from '../../db/data-source.js';
import { User } from '../rbac/user.entity.js';

export const userRepo = () => AppDataSource.getRepository(User);
