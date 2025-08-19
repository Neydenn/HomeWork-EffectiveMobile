import { User } from '../modules/rbac/user.entity';

declare global {
    namespace Express {
        interface Request {
        user?: User;
        permissions?: Set<string>;
        }
    }
}

export {};
