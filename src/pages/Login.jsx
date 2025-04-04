import { AppBar, Toolbar, Typography, Container } from '@mui/material';
import LoginForm from '../components/LoginForm';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const handleLogin = (token, userId, role) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('role', role);
    navigate('/medical-record');
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#1976d2', mb: 4 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 500 }}>
            MediConnect - Connexion
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm">
        <LoginForm onLogin={handleLogin} />
      </Container>
    </>
  );
}

export default Login;