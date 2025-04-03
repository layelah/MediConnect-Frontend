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
import { getMedicalRecords } from '../services/api';

function MedicalRecordList({ patientId, token }) {
  const [records, setRecords] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const data = await getMedicalRecords(patientId, token);
        setRecords(data.records);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchRecords();
  }, [patientId, token]);

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h6" sx={{ mb: 2, color: '#1976d2' }}>
        Dossiers Médicaux
      </Typography>
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      <List>
        {records.length === 0 ? (
          <Typography>Aucun dossier disponible</Typography>
        ) : (
          records.map((record, index) => (
            <Box key={record.id}>
              <ListItem>
                <ListItemText
                  primary={`${record.record_type} - ${new Date(record.created_at).toLocaleDateString()}`}
                  secondary={record.details}
                />
              </ListItem>
              {index < records.length - 1 && <Divider />}
            </Box>
          ))
        )}
      </List>
    </Paper>
  );
}

export default MedicalRecordList;