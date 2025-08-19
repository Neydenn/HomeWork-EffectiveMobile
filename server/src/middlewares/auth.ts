import { NextFunction, Response } from 'express';
import { verifyToken } from '../utils/jwt.js';
import { AppDataSource } from '../db/data-source.js';
import { User } from '../modules/rbac/user.entity.js';
import { HttpError } from './error.js';

export async function auth(req: any, _res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) throw new HttpError(401, 'Missing Bearer token');
    const token = authHeader.slice('Bearer '.length);
    const payload = verifyToken(token);

    const repo = AppDataSource.getRepository(User);
    const user = await repo.findOne({
        where: { id: payload.sub },
        relations: { role: true }
    });
    if (!user) throw new HttpError(401, 'User not found');
    if (!user.isActive) throw new HttpError(403, 'User is blocked');

    const permissions = new Set<string>(user.role.permissions?.map(p => p.name) ?? []);
    req.user = user;
    req.permissions = permissions;
    next();
}
