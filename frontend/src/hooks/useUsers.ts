import { useCallback, useState } from 'react';
import { apiFetch } from '../lib/api';
import type { User } from '../lib/types';
import { useAuth } from './useAuth';

export function useUsers() {
    const { token } = useAuth();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const reload = useCallback(async () => {
        if (!token) return;
        setLoading(true);
        setError(null);
        try {
            const list = await apiFetch<User[]>(`/users`, { token });
            setUsers(list);
        } catch (e: any) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    }, [token]);

    const block = useCallback(
        async (id: string) => {
            if (!token) return;
            setError(null);
            await apiFetch<User>(`/users/${id}/block`, { method: 'POST', token });
            await reload();
        },
        [token, reload]
    );

    return { users, loading, error, reload, block };
}
