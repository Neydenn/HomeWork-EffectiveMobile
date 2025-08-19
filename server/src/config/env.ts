import 'dotenv/config';

export const env = {
    nodeEnv: process.env.NODE_ENV ?? 'development',
    port: Number(process.env.PORT ?? 8080),

    db: {
        host: process.env.DB_HOST ?? 'localhost',
        port: Number(process.env.DB_PORT ?? 5432),
        user: process.env.DB_USER ?? 'postgres',
        pass: process.env.DB_PASSWORD ?? 'postgres',
        name: process.env.DB_NAME ?? 'users_db',
    },

    jwt: {
        secret: process.env.JWT_SECRET ?? 'change_me',
        ttl: process.env.JWT_TTL ?? '30m',
    },

    seedAdmin: {
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
        fullName: process.env.ADMIN_FULLNAME,
        dob: process.env.ADMIN_DOB,
    },
} as const;
