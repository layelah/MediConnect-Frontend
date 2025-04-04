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
import { getPrescriptions } from '../services/api';

function PrescriptionList({ token }) {
  const [prescriptions, setPrescriptions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const data = await getPrescriptions(token);
        setPrescriptions(data.prescriptions);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchPrescriptions();
  }, [token]);

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h6" sx={{ mb: 2, color: '#1976d2' }}>
        Mes Prescriptions
      </Typography>
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      <List>
        {prescriptions.length === 0 ? (
          <Typography>Aucune prescription disponible</Typography>
        ) : (
          prescriptions.map((prescription, index) => (
            <Box key={prescription.id}>
              <ListItem>
                <ListItemText
                  primary={`${prescription.medication} - ${prescription.dosage}`}
                  secondary={`${prescription.instructions || 'Aucune instruction'} - ${new Date(prescription.created_at).toLocaleDateString()}`}
                />
              </ListItem>
              {index < prescriptions.length - 1 && <Divider />}
            </Box>
          ))
        )}
      </List>
    </Paper>
  );
}

export default PrescriptionList;