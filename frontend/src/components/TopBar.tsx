import { AppBar, Toolbar, Typography, Stack, Chip, Button } from '@mui/material';
import { useAuth } from '../hooks/useAuth';

export function TopBar() {
    const { me, logout } = useAuth();
    return (
        <AppBar position="static">
        <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Users Service — Demo UI
            </Typography>
            {me && (
            <Stack direction="row" spacing={1} alignItems="center">
                <Chip label={me.role?.name.toUpperCase()} />
                <Typography>{me.email}</Typography>
                <Button color="inherit" onClick={logout}>
                    Logout
                </Button>
            </Stack>
            )}
        </Toolbar>
        </AppBar>
    );
}
