// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import JournalPage from './pages/JournalPage';
import DashboardPage from './pages/DashboardPage';
import InsightsPage from './pages/InsightsPage';
import HistoryPage from './pages/HistoryPage'; // <--- NOUVEL IMPORT : Importez HistoryPage ici

// Importez ces pages si elles existent et que vous comptez les utiliser
import LoginPage from './pages/LoginPage';
import PatientManagementPage from './pages/PatientManagementPage';

function App() {
  const appName = "MindSphere AI";
  // Ajoutez des états pour l'authentification et l'ID du patient
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Par défaut non authentifié
  const [currentPatientId, setCurrentPatientId] = useState(null);

  // Fonctions simulées (vous les remplacerez par votre logique backend)
  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentPatientId('patient123'); // Exemple d'ID
    // Rediriger l'utilisateur après connexion si nécessaire
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPatientId(null);
    // Rediriger l'utilisateur après déconnexion si nécessaire
  };

  return (
    <Router>
      {/* Passez les props d'authentification à MainLayout */}
      <MainLayout
        appName={appName}
        isAuthenticated={isAuthenticated}
        currentPatientId={currentPatientId}
      >
        <Routes>
          {/* Les routes principales de l'application */}
          {/* JournalPage peut être accessible via la racine et /journal */}
          <Route path="/" element={<JournalPage />} />
          <Route path="/journal" element={<JournalPage />} />

          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/insights" element={<InsightsPage />} />
          
          {/* NOUVELLE LIGNE : Ajoutez la route pour la page History */}
          <Route path="/history" element={<HistoryPage />} /> 

          {/* Routes conditionnelles pour la connexion et la gestion des patients */}
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          {isAuthenticated ? (
            <Route path="/patients" element={<PatientManagementPage />} />
          ) : (
            // Rediriger vers la page de connexion si non authentifié pour /patients
            // Note: Ce n'est pas une redirection automatique, juste un affichage de LoginPage
            <Route path="/patients" element={<LoginPage onLogin={handleLogin} />} />
          )}
          
          {/* Optionnel: une route 404 pour les chemins non trouvés */}
          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;