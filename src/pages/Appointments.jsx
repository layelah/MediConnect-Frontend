import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import AppointmentForm from '../components/AppointmentForm';
import AppointmentList from '../components/AppointmentList';

function Appointments() {
  const token = localStorage.getItem('token');

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#1976d2', mb: 4 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 500 }}>
            MediConnect - Rendez-vous
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">
        <AppointmentForm token={token} />
        <Box sx={{ mt: 4 }}>
          <AppointmentList token={token} />
        </Box>
      </Container>
    </>
  );
}

export default Appointments;