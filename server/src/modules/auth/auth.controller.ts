import { Request, Response } from 'express';
import { z } from 'zod';
import { AuthService } from './auth.service.js';

const registerSchema = z.object({
    fullName: z.string().min(1),
    dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    email: z.string().email(),
    password: z.string().min(8)
});

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1)
});

const service = new AuthService();

export const AuthController = {
    registerSchema,
    loginSchema,

    register: async (req: Request, res: Response) => {
        const result = await service.register(req.body);
        res.status(201).json(result);
    },

    login: async (req: Request, res: Response) => {
        const result = await service.login(req.body);
        res.json(result);
    }
};
