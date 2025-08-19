import { MigrationInterface, QueryRunner } from 'typeorm';
import { hashPassword } from '../../utils/password.js';
import { env } from '../../config/env.js';

export class Init1700000000000 implements MigrationInterface {
    name = 'Init1700000000000';

    public async up(q: QueryRunner): Promise<void> {
        await q.query(`CREATE EXTENSION IF NOT EXISTS pgcrypto;`);
        
        await q.query(`
        CREATE TABLE roles (
            id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
            name varchar UNIQUE NOT NULL
        );
        CREATE TABLE permissions (
            id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
            name varchar UNIQUE NOT NULL
        );
        CREATE TABLE role_permissions (
            "roleId" uuid NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
            "permissionId" uuid NOT NULL REFERENCES permissions(id) ON DELETE CASCADE,
            PRIMARY KEY ("roleId","permissionId")
        );
        CREATE TABLE users (
            id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
            "fullName" varchar NOT NULL,
            "dateOfBirth" date NOT NULL,
            email varchar UNIQUE NOT NULL,
            "passwordHash" varchar NOT NULL,
            "isActive" boolean NOT NULL DEFAULT true,
            "roleId" uuid NOT NULL REFERENCES roles(id),
            "createdAt" timestamptz NOT NULL DEFAULT now(),
            "updatedAt" timestamptz NOT NULL DEFAULT now()
        );
        CREATE INDEX IF NOT EXISTS idx_users_email_unique ON users(email);
        `);

        await q.query(`INSERT INTO roles (name) VALUES ('admin'), ('user') ON CONFLICT DO NOTHING;`);

        const perms = ['users:read','users:list','users:block'];
        for (const p of perms) {
        await q.query(`INSERT INTO permissions (name) VALUES ($1) ON CONFLICT DO NOTHING;`, [p]);
        }

        await q.query(`
        INSERT INTO role_permissions ("roleId","permissionId")
        SELECT r.id, p.id FROM roles r CROSS JOIN permissions p WHERE r.name='admin'
        ON CONFLICT DO NOTHING;
        `);

        const { email, password, fullName, dob } = env.seedAdmin;
        if (email && password && fullName && dob) {
        const [{ id: adminRoleId }] = await q.query(`SELECT id FROM roles WHERE name='admin'`);
        const pwd = await hashPassword(password);
        await q.query(
            `INSERT INTO users ("fullName","dateOfBirth",email,"passwordHash","roleId") VALUES ($1,$2,$3,$4,$5)
            ON CONFLICT (email) DO NOTHING;`,
            [fullName, dob, email, pwd, adminRoleId]
        );
        }
    }

    public async down(q: QueryRunner): Promise<void> {
        await q.query(`DROP TABLE IF EXISTS users;`);
        await q.query(`DROP TABLE IF EXISTS role_permissions;`);
        await q.query(`DROP TABLE IF EXISTS permissions;`);
        await q.query(`DROP TABLE IF EXISTS roles;`);
    }
}
