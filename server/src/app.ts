import express, { type Request, type Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import 'express-async-errors';
import { authRoutes } from './modules/auth/auth.routes.js';
import { userRoutes } from './modules/users/user.routes.js';
import { errorHandler } from './middlewares/error.js';

export function createApp() {
    const app = express();
    app.use(helmet());
    app.use(cors());
    app.use(express.json());

    app.get('/health', (_req: Request, res: Response) => res.json({ ok: true }));

    app.use('/api/v1/auth', authRoutes);
    app.use('/api/v1/users', userRoutes);

    app.use(errorHandler);
    return app;
}
