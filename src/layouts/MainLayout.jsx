// src/layouts/MainLayout.jsx
import React from 'react';
import Navbar from '../components/Navbar';

// Acceptez les props appName, isAuthenticated, currentPatientId
const MainLayout = ({ children, appName, isAuthenticated, currentPatientId }) => {
  return (
    <div className="min-h-screen bg-background_light flex flex-col">
      {/* Passez les props à Navbar */}
      <Navbar appName={appName} isAuthenticated={isAuthenticated} currentPatientId={currentPatientId} />
      <main className="flex-grow container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
      <footer className="bg-primary text-white text-center p-4 mt-8">
        <p>&copy; {new Date().getFullYear()} {appName}. Tous droits réservés.</p>
      </footer>
    </div>
  );
};

export default MainLayout;