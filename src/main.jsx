// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { CssBaseline } from '@mui/material'; // Normalise les styles par défaut

/**
 * Point d’entrée de l’application React.
 * Initialise l’application avec Material-UI et rend le composant principal.
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CssBaseline /> {/* Assure une base CSS cohérente */}
    <App />
  </React.StrictMode>,
);