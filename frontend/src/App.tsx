import { useState } from 'react';
import { Alert, Box, Container, Paper, Tab, Tabs } from '@mui/material';
import { TopBar } from './components/TopBar';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';
import { ProfileView } from './components/ProfileView';
import { UsersTable } from './components/UsersTable';
import { useAuth } from './hooks/useAuth';

export default function App() {
  const [tab, setTab] = useState(0);
  const { token, error, can } = useAuth();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <TopBar />
      <Container sx={{ mt: 3, mb: 6 }}>
        <Paper sx={{ p: 2 }}>
          <Tabs value={tab} onChange={(_, v) => setTab(v)}>
            <Tab label="Login" />
            <Tab label="Register" />
            <Tab label="Profile" disabled={!token} />
            <Tab label="Users" disabled={!token || !can('users:list')} />
          </Tabs>
          <Box sx={{ mt: 2 }}>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {tab === 0 && <LoginForm onSuccess={() => setTab(2)} />}
            {tab === 1 && <RegisterForm onSuccess={() => setTab(0)} />}
            {tab === 2 && token && <ProfileView />}
            {tab === 3 && token && can('users:list') && <UsersTable />}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
