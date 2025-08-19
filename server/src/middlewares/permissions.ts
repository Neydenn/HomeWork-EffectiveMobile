import { NextFunction, Request, Response } from 'express';
import { HttpError } from './error.js';

export const requirePermission = (perm: string) =>
    (req: any, _res: Response, next: NextFunction) => {
        if (req.permissions?.has(perm)) return next();
        throw new HttpError(403, 'Forbidden');
    };

export const isSelfOr = (perm: string, idParam: string = 'id') =>
    (req: any, _res: Response, next: NextFunction) => {
        if (req.user?.id === req.params[idParam]) return next();
        if (req.permissions?.has(perm)) return next();
        throw new HttpError(403, 'Forbidden');
    };
