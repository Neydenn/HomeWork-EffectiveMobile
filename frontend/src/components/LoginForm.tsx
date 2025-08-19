import { useState } from 'react';
import { Button, Stack, TextField } from '@mui/material';
import { useAuth } from '../hooks/useAuth';

export function LoginForm({ onSuccess }: { onSuccess?: () => void }) {
    const { login, loading } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        await login(email, password);
        onSuccess?.();
    };

    return (
        <form onSubmit={submit}>
        <Stack spacing={2} sx={{ maxWidth: 420 }}>
            <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <Button type="submit" variant="contained" disabled={loading}>
            {loading ? '...' : 'Login'}
            </Button>
        </Stack>
        </form>
    );
}
