import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { env } from '../config/env.js';
import { User } from '../modules/rbac/user.entity.js';
import { Role } from '../modules/rbac/role.entity.js';
import { Permission } from '../modules/rbac/permission.entity.js';
import { Init1700000000000 } from './migrations/1700000000000-Init.js';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: env.db.host,
    port: env.db.port,
    username: env.db.user,
    password: env.db.pass,
    database: env.db.name,
    entities: [User, Role, Permission],
    migrations: [Init1700000000000],
    synchronize: false,
    logging: false,
});
