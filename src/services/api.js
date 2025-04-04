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
    const endpoint = role === 'doctor' ? '/doctors/login' : role === 'assistant' ? '/assistants/login' : '/patients/login';
    const response = await api.post(endpoint, { email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Erreur lors de la connexion' };
  }
};

export const createAppointment = async (data, token) => {
  try {
    const response = await api.post('/appointments/create', data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Erreur lors de la création du rendez-vous' };
  }
};

export const getAppointments = async (token) => {
  try {
    const response = await api.get('/appointments', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Erreur lors de la récupération des rendez-vous' };
  }
};

export const createPrescription = async (data, token) => {
  try {
    const response = await api.post('/prescriptions/create', data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Erreur lors de la création de la prescription' };
  }
};

export const getPrescriptions = async (token) => {
  try {
    const response = await api.get('/prescriptions', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Erreur lors de la récupération des prescriptions' };
  }
};

export default api;