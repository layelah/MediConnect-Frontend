import { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { loginUser } from '../services/api';

function LoginForm({ onLogin }) {
  const [formData, setFormData] = useState({ email: '', password: '', role: 'patient' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await loginUser(formData.email, formData.password, formData.role);
      onLogin(response.token, formData.role === 'patient' ? response.patient.id : response.assistant.id);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={6} sx={{ p: 4, borderRadius: 2, maxWidth: 400, mx: 'auto' }}>
      <Typography variant="h5" align="center" sx={{ mb: 3, color: '#1976d2' }}>
        Connexion
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          fullWidth
          variant="outlined"
        />
        <TextField
          label="Mot de passe"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
          fullWidth
          variant="outlined"
        />
        <FormControl fullWidth>
          <InputLabel>Rôle</InputLabel>
          <Select name="role" value={formData.role} onChange={handleChange}>
            <MenuItem value="patient">Patient</MenuItem>
            <MenuItem value="assistant">Assistant</MenuItem>
          </Select>
        </FormControl>
        {error && (
          <Typography align="center" color="error.main">
            {error}
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
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Se connecter'}
        </Button>
      </Box>
    </Paper>
  );
}

export default LoginForm;