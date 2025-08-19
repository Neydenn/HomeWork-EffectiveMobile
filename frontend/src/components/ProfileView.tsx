import { Alert, Button, Chip, Stack, TextField, Typography } from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import { apiFetch } from '../lib/api';

export function ProfileView() {
    const { me, token, logout } = useAuth();

    const blockSelf = async () => {
        if (!me || !token) return;
        await apiFetch(`/users/${me.id}/block`, { method: 'POST', token });
        logout();
    };

    if (!me) return <Alert severity="warning">Нет профиля</Alert>;

    return (
        <Stack spacing={2}>
        <Typography variant="h6">Profile</Typography>
        <Stack direction="row" spacing={2}>
            <TextField label="Full name" value={me.fullName} InputProps={{ readOnly: true }} />
            <TextField label="Email" value={me.email} InputProps={{ readOnly: true }} />
            <TextField label="DOB" value={me.dateOfBirth} InputProps={{ readOnly: true }} />
        </Stack>
        <Stack direction="row" spacing={2} alignItems="center">
            <Chip label={me.isActive ? 'Active' : 'Blocked'} color={me.isActive ? 'success' : 'warning'} />
            <Chip label={`Role: ${me.role?.name}`} />
        </Stack>
        <Button variant="outlined" color="error" onClick={blockSelf}>
            Block myself
        </Button>
        <Typography variant="body2" color="text.secondary">
            Permissions: {me.role?.permissions?.map((p) => p.name).join(', ') || '—'}
        </Typography>
        </Stack>
    );
}
