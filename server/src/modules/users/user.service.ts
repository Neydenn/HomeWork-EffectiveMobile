import { userRepo } from './user.repository.js';
import { HttpError } from '../../middlewares/error.js';

export class UserService {
    private repo = userRepo();

    async getById(id: string) {
        const user = await this.repo.findOne({ where: { id } });
        if (!user) throw new HttpError(404, 'User not found');
        return this.sanitize(user);
    }

    async list() {
        const users = await this.repo.find();
        return users.map(this.sanitize);
    }

    async block(id: string) {
        const user = await this.repo.findOne({ where: { id } });
        if (!user) throw new HttpError(404, 'User not found');
        if (!user.isActive) return this.sanitize(user);

        user.isActive = false;
        await this.repo.save(user);
        return this.sanitize(user);
    }

    private sanitize(u: any) {
        const { passwordHash, ...safe } = u;
        return safe;
    }
}
