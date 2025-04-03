import { AppBar, Toolbar, Typography, Container } from '@mui/material';
import MedicalRecordList from '../components/MedicalRecordList';

function MedicalRecord() {
  const token = localStorage.getItem('token');
  const patientId = localStorage.getItem('userId');

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#1976d2', mb: 4 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 500 }}>
            MediConnect - Dossier Médical
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">
        <MedicalRecordList patientId={patientId} token={token} />
      </Container>
    </>
  );
}

export default MedicalRecord;