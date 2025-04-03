// src/components/RegisterForm.jsx
import { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  CircularProgress,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { registerPatient } from '../services/api';

/**
 * Composant de formulaire d’inscription pour les patients.
 * Inclut un design moderne, des validations, et une gestion d’état.
 */
function RegisterForm() {
  // État des données du formulaire
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  });

  // État pour les messages et le chargement
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  /**
   * Valide les champs du formulaire côté client.
   * @returns {boolean} - True si valide, false sinon
   */
  const validateForm = () => {
    const newErrors = {};

    if (!formData.first_name) newErrors.first_name = 'Le prénom est requis';
    if (!formData.last_name) newErrors.last_name = 'Le nom est requis';
    if (!formData.email) {
      newErrors.email = 'L’email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'L’email est invalide';
    }
    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Le mot de passe doit avoir au moins 6 caractères';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Gère les changements dans les champs.
   * @param {object} e - Événement de changement
   */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // Efface l’erreur du champ modifié
  };

  /**
   * Bascule la visibilité du mot de passe.
   */
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  /**
   * Soumet le formulaire au backend.
   * @param {object} e - Événement de soumission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setMessage('');

    try {
      const response = await registerPatient(formData);
      setMessage(response.message);
      setFormData({ first_name: '', last_name: '', email: '', password: '' });
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper
      elevation={6} // Ombre prononcée pour un effet "flottant"
      sx={{
        p: 4, // Padding interne
        borderRadius: 2, // Coins arrondis
        backgroundColor: '#fff',
        maxWidth: 400,
        mx: 'auto', // Centre horizontalement
      }}
    >
      <Typography
        variant="h5"
        align="center"
        sx={{ mb: 3, fontWeight: 500, color: '#1976d2' }}
      >
        Inscription Patient
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        <TextField
          label="Prénom"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          required
          fullWidth
          variant="outlined"
          error={!!errors.first_name}
          helperText={errors.first_name}
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1 } }}
        />
        <TextField
          label="Nom"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          required
          fullWidth
          variant="outlined"
          error={!!errors.last_name}
          helperText={errors.last_name}
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1 } }}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          fullWidth
          variant="outlined"
          error={!!errors.email}
          helperText={errors.email}
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1 } }}
        />
        <TextField
          label="Mot de passe"
          name="password"
          type={showPassword ? 'text' : 'password'}
          value={formData.password}
          onChange={handleChange}
          required
          fullWidth
          variant="outlined"
          error={!!errors.password}
          helperText={errors.password}
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1 } }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleTogglePassword} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {message && (
          <Typography
            align="center"
            sx={{
              color: message.includes('succès') ? 'success.main' : 'error.main',
              fontWeight: 500,
            }}
          >
            {message}
          </Typography>
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
          sx={{
            py: 1.5, // Bouton plus grand
            borderRadius: 1,
            textTransform: 'none', // Pas de majuscules
            fontSize: '1.1rem',
            boxShadow: 3,
            '&:hover': { boxShadow: 6 }, // Animation au survol
          }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'S’inscrire'}
        </Button>
      </Box>
    </Paper>
  );
}

export default RegisterForm;