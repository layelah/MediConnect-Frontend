import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import PrescriptionForm from '../components/PrescriptionForm';
import PrescriptionList from '../components/PrescriptionList';

function Prescriptions() {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role'); // On suppose que le rôle est stocké après login

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#1976d2', mb: 4 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 500 }}>
            MediConnect - Prescriptions
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">
        {role === 'doctor' && <PrescriptionForm token={token} />}
        <Box sx={{ mt: 4 }}>
          <PrescriptionList token={token} />
        </Box>
      </Container>
    </>
  );
}

export default Prescriptions;