import { useEffect } from 'react';
import { Alert, Button, Paper, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography, Chip } from '@mui/material';
import { useUsers } from '../hooks/useUsers';

export function UsersTable() {
    const { users, loading, error, reload, block } = useUsers();

    useEffect(() => {
        reload();
    }, [reload]);

    return (
        <>
        <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
            <Button variant="outlined" onClick={reload} disabled={loading}>
            Reload
            </Button>
        </Stack>
        {error && <Alert severity="error">{error}</Alert>}
        <Paper variant="outlined">
            <Table size="small">
            <TableHead>
                <TableRow>
                <TableCell>Full name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>DOB</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {users.map((u) => (
                <TableRow key={u.id} hover>
                    <TableCell>{u.fullName}</TableCell>
                    <TableCell>{u.email}</TableCell>
                    <TableCell>{u.dateOfBirth}</TableCell>
                    <TableCell>{u.role?.name}</TableCell>
                    <TableCell>
                    <Chip size="small" label={u.isActive ? 'Active' : 'Blocked'} color={u.isActive ? 'success' : 'warning'} />
                    </TableCell>
                    <TableCell align="right">
                    <Button size="small" variant="outlined" color="error" disabled={!u.isActive} onClick={() => block(u.id)}>
                        Block
                    </Button>
                    </TableCell>
                </TableRow>
                ))}
                {users.length === 0 && (
                <TableRow>
                    <TableCell colSpan={6}>
                    <Typography variant="body2">Нет данных</Typography>
                    </TableCell>
                </TableRow>
                )}
            </TableBody>
            </Table>
        </Paper>
        </>
    );
}
