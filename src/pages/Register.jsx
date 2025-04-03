// src/pages/Register.jsx
import { AppBar, Toolbar, Typography, Container } from '@mui/material';
import RegisterForm from '../components/RegisterForm';

/**
 * Page d’inscription pour les patients.
 * Affiche un en-tête et le formulaire d’inscription.
 */
function Register() {
  return (
    <>
      {/* En-tête de l’application */}
      <AppBar position="static" sx={{ backgroundColor: '#1976d2', mb: 4 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 500 }}>
            MediConnect
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Contenu principal */}
      <Container maxWidth="sm">
        <RegisterForm />
      </Container>
    </>
  );
}

export default Register;