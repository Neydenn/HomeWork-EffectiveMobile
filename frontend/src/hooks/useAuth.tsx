import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { apiFetch } from '../lib/api';
import { parseJwt } from '../lib/jwt';
import { storage } from '../lib/storage';
import type { User } from '../lib/types';

interface AuthContextValue {
    token: string | null;
    me: User | null;
    loading: boolean;
    error: string | null;
    can: (perm: string) => boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (data: { fullName: string; dateOfBirth: string; email: string; password: string }) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [token, setToken] = useState<string | null>(() => storage.getToken());
    const [me, setMe] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const can = useCallback(
        (perm: string) => !!me?.role?.permissions?.some((p) => p.name === perm),
        [me]
    );

    const logout = useCallback(() => {
        storage.clear();
        setToken(null);
        setMe(null);
    }, []);

    useEffect(() => {
        setError(null);
        if (!token) {
            setMe(null);
            return;
        }
        const payload = parseJwt<{ sub: string }>(token);
        const userId = payload?.sub;
        if (!userId) {
            setError('Некорректный токен');
            logout();
            return;
        }
        setLoading(true);
        apiFetch<User>(`/users/${userId}`, { token })
        .then(setMe)
        .catch((e: any) => {
            setError(e.message || 'Не удалось получить профиль');
            if (String(e.message).toLowerCase().includes('blocked')) logout();
        })
        .finally(() => setLoading(false));
    }, [token, logout]);

    const login = useCallback(async (email: string, password: string) => {
        setError(null);
        setLoading(true);
        try {
            const res = await apiFetch<{ accessToken: string }>(`/auth/login`, {
                method: 'POST',
                body: JSON.stringify({ email, password }),
        });
            storage.setToken(res.accessToken);
            setToken(res.accessToken);
        } finally {
            setLoading(false);
        }
    }, []);

    const register = useCallback(
        async (data: { fullName: string; dateOfBirth: string; email: string; password: string }) => {
        setError(null);
        setLoading(true);
        try {
            await apiFetch(`/auth/register`, { method: 'POST', body: JSON.stringify(data) });
        } finally {
            setLoading(false);
        }
        },
        []
    );

    const value = useMemo(
        () => ({ token, me, loading, error, can, login, register, logout }),
        [token, me, loading, error, can, login, register, logout]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
}
