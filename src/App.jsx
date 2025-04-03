import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import MedicalRecord from './pages/MedicalRecord';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/medical-record" element={<MedicalRecord />} />
      </Routes>
    </Router>
  );
}

export default App;