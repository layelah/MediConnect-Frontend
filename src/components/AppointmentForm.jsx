import { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  CircularProgress,
} from '@mui/material';
import { createAppointment } from '../services/api';

function AppointmentForm({ token }) {
  const [formData, setFormData] = useState({
    patient_id: '',
    doctor_id: '',
    appointment_date: '',
    reason: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await createAppointment(formData, token);
      setMessage(response.message);
      setFormData({ doctor_id: '', appointment_date: '', reason: '' });
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={6} sx={{ p: 4, borderRadius: 2, maxWidth: 400, mx: 'auto' }}>
      <Typography variant="h5" align="center" sx={{ mb: 3, color: '#1976d2' }}>
        Prendre un rendez-vous
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      <TextField
        label="ID du patient"
        name="patient_id"
        value={formData.patient_id}
        onChange={handleChange}
        required
        fullWidth
        variant="outlined"
        />
        <TextField
          label="ID du médecin"
          name="doctor_id"
          value={formData.doctor_id}
          onChange={handleChange}
          required
          fullWidth
          variant="outlined"
        />
        <TextField
          label="Date et heure"
          name="appointment_date"
          type="datetime-local"
          value={formData.appointment_date}
          onChange={handleChange}
          required
          fullWidth
          variant="outlined"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Raison"
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          required
          fullWidth
          variant="outlined"
        />
        {message && (
          <Typography align="center" sx={{ color: message.includes('succès') ? 'success.main' : 'error.main' }}>
            {message}
          </Typography>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
          sx={{ py: 1.5, borderRadius: 1 }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Confirmer'}
        </Button>
      </Box>
    </Paper>
  );
}

export default AppointmentForm;