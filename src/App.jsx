// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';

/**
 * Composant principal de l’application.
 * Définit les routes de navigation avec React Router.
 */
function App() {
  return (
    <Router>
      <Routes>
        {/* Route par défaut vers la page d’inscription */}
        <Route path="/" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;