import 'reflect-metadata';
import { createApp } from './app.js';
import { AppDataSource } from './db/data-source.js';
import { env } from './config/env.js';

async function bootstrap() {
    await AppDataSource.initialize();
    const app = createApp();
    app.listen(env.port, () => console.log(`Server on :${env.port}`));
}

bootstrap().catch((e) => {
    console.error(e);
    process.exit(1);
});
