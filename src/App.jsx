import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import MedicalRecord from './pages/MedicalRecord';
import Login from './pages/Login';
import Appointments from './pages/Appointments';
import Prescriptions from './pages/Prescriptions';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/medical-record" element={<MedicalRecord />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/prescriptions" element={<Prescriptions />} />
      </Routes>
    </Router>
  );
}

export default App;