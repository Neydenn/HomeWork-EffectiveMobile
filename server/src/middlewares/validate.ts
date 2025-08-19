import { ZodSchema } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { HttpError } from './error.js';

export const validate =
    (schema: ZodSchema, place: 'body' | 'query' | 'params' = 'body') =>
    (req: Request, _res: Response, next: NextFunction) => {
        const result = schema.safeParse((req as any)[place]);
        if (!result.success) throw new HttpError(400, result.error.flatten().formErrors.join('; '));
        (req as any)[place] = result.data;
        next();
    };
