import { Request, Response } from 'express';
import { z } from 'zod';
import { UserService } from './user.service.js';

const idParams = z.object({ id: z.string().uuid() });

const service = new UserService();

export const UserController = {
    idParams,

    getById: async (req: Request, res: Response) => {
        const user = await service.getById(req.params.id);
        res.json(user);
    },

    list: async (_req: Request, res: Response) => {
        const users = await service.list();
        res.json(users);
    },

    block: async (req: Request, res: Response) => {
        const user = await service.block(req.params.id);
        res.json(user);
    }
};
