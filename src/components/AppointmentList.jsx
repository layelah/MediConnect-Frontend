import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import { getAppointments } from '../services/api';

function AppointmentList({ token }) {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await getAppointments(token);
        setAppointments(data.appointments);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchAppointments();
  }, [token]);

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h6" sx={{ mb: 2, color: '#1976d2' }}>
        Mes Rendez-vous
      </Typography>
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      <List>
        {appointments.length === 0 ? (
          <Typography>Aucun rendez-vous disponible</Typography>
        ) : (
          appointments.map((appointment, index) => (
            <Box key={appointment.id}>
              <ListItem>
                <ListItemText
                  primary={`${new Date(appointment.appointment_date).toLocaleString()} - ${appointment.reason}`}
                  secondary={`Statut: ${appointment.status}`}
                />
              </ListItem>
              {index < appointments.length - 1 && <Divider />}
            </Box>
          ))
        )}
      </List>
    </Paper>
  );
}

export default AppointmentList;