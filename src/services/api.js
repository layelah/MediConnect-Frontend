// src/services/api.js
import axios from 'axios';

/**
 * Instance Axios configurée pour communiquer avec le backend de MediConnect.
 */
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // URL de base du backend
  headers: {
    'Content-Type': 'application/json', // Format des données envoyées
  },
});

/**
 * Inscrit un patient via l’API.
 * @param {object} data - Données du patient (first_name, last_name, email, password)
 * @returns {Promise<object>} - Réponse de l’API avec les détails du patient créé
 * @throws {object} - Erreur renvoyée par l’API en cas d’échec
 */
export const registerPatient = async (data) => {
  try {
    const response = await api.post('/patients/register', data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Erreur inattendue lors de l’inscription' };
  }
};

export default api;