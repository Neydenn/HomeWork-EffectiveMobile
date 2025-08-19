import { useState } from 'react';
import { Alert, Button, Stack, TextField } from '@mui/material';
import { apiFetch } from '../lib/api';

export function RegisterForm({ onSuccess }: { onSuccess?: (email: string, password: string) => void }) {
    const [fullName, setFullName] = useState('');
    const [dateOfBirth, setDob] = useState('1999-01-01');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [info, setInfo] = useState<string | null>(null);

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setInfo(null);
        try {
        await apiFetch(`/auth/register`, {
            method: 'POST',
            body: JSON.stringify({ fullName, dateOfBirth, email, password }),
        });
        setInfo('Регистрация успешна. Теперь войди.');
        onSuccess?.(email, password);
        } catch (e: any) {
        setError(e.message);
        }
    };

    return (
        <form onSubmit={submit}>
        <Stack spacing={2} sx={{ maxWidth: 480 }}>
            {error && <Alert severity="error">{error}</Alert>}
            {info && <Alert severity="info">{info}</Alert>}
            <TextField label="Full name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
            <TextField label="Date of birth" type="date" value={dateOfBirth} onChange={(e) => setDob(e.target.value)} required InputLabelProps={{ shrink: true }} />
            <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <TextField label="Password (min 8)" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <Button type="submit" variant="contained">Register</Button>
        </Stack>
        </form>
    );
}
