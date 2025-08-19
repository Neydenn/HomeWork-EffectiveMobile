import jwt, { type Secret, type SignOptions } from 'jsonwebtoken';
import { env } from '../config/env.js';

export type JwtPayload = { sub: string };

const secret: Secret = env.jwt.secret;
const opts: SignOptions = { expiresIn: env.jwt.ttl as SignOptions['expiresIn'] };

export function signToken(userId: string) {
    return jwt.sign({ sub: userId } as JwtPayload, secret, opts);
}

export function verifyToken(token: string): JwtPayload {
    return jwt.verify(token, secret) as JwtPayload;
}
