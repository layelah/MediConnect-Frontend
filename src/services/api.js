import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const registerPatient = async (data) => {
  try {
    const response = await api.post('/patients/register', data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Erreur inattendue lors de l’inscription' };
  }
};

export const getMedicalRecords = async (patientId, token) => {
  try {
    const response = await api.get(`/medical-records/${patientId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Erreur lors de la récupération des dossiers' };
  }
};

export const loginUser = async (email, password, role) => {
  try {
    const endpoint = role === 'assistant' ? '/assistants/login' : '/patients/login';
    const response = await api.post(endpoint, { email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Erreur lors de la connexion' };
  }
};

export default api;