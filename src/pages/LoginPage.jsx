// src/pages/LoginPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate();

 
  const user = {
    username: 'Chaymae',
    profilePic: 'https://placehold.co/150x150/FFC0CB/000000?text=Chaymae', 
  };

  
  React.useEffect(() => {
    
    onLogin(true);
    
    const timer = setTimeout(() => {
      navigate('/journal');
    }, 1000); 

    return () => clearTimeout(timer); 
  }, [navigate, onLogin]);


  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-160px)] bg-background_light p-4 sm:p-6">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-border_light text-center">
        <h1 className="text-3xl font-bold text-text_primary mb-6">Bienvenue sur MindSphere AI !</h1>
        
        <div className="flex flex-col items-center space-y-4">
          <img 
            src={user.profilePic} 
            alt={`Profil de ${user.username}`} 
            className="w-32 h-32 rounded-full object-cover border-4 border-primary shadow-md"
          />
          <h2 className="text-2xl font-semibold text-text_secondary">Salut, {user.username} !</h2>
          <p className="text-md text-gray-600">Prêt(e) à explorer vos émotions aujourd'hui ?</p>
        </div>

        
        <button
          onClick={() => navigate('/journal')}
          className="mt-8 w-full px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition duration-200 shadow-md"
        >
          Accéder à votre Journal
        </button>

      </div>
    </div>
  );
};

export default LoginPage;
