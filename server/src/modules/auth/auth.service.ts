import { AppDataSource } from '../../db/data-source.js';
import { User } from '../rbac/user.entity.js';
import { Role } from '../rbac/role.entity.js';
import { hashPassword, verifyPassword } from '../../utils/password.js';
import { signToken } from '../../utils/jwt.js';
import { HttpError } from '../../middlewares/error.js';

export class AuthService {
    private users = AppDataSource.getRepository(User);
    private roles = AppDataSource.getRepository(Role);

    async register(data: { fullName: string; dateOfBirth: string; email: string; password: string }) {
        const exists = await this.users.findOne({ where: { email: data.email } });
        if (exists) throw new HttpError(409, 'Email already in use');

        const role = await this.roles.findOneOrFail({ where: { name: 'user' } });
        const passwordHash = await hashPassword(data.password);

        const user = this.users.create({ ...data, passwordHash, role });
        await this.users.save(user);

        return { id: user.id, email: user.email };
    }

    async login(data: { email: string; password: string }) {
        const user = await this.users.findOne({
        where: { email: data.email },
        relations: { role: true }
        });
        if (!user) throw new HttpError(401, 'Invalid credentials');
        if (!user.isActive) throw new HttpError(403, 'User is blocked');

        const ok = await verifyPassword(user.passwordHash, data.password);
        if (!ok) throw new HttpError(401, 'Invalid credentials');

        const token = signToken(user.id);
        return { accessToken: token };
    }
}
