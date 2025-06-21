// src/components/Navbar.jsx
import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const Navbar = ({ appName, isAuthenticated, currentPatientId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Journal', path: '/journal', icon: '📝' }, // <--- CHANGEZ ICI: /journal
    { name: 'Dashboard', path: '/dashboard', icon: '📊' },
    { name: 'Insights', path: '/insights', icon: '💡' },
    { name: 'Historique', path: '/history', icon: 'archives' },
  ];

  // ... (le reste de votre code Navbar est correct)
  const isLinkActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const getLinkClasses = (linkPath, isMobile = false) => {
    const active = isLinkActive(linkPath);
    if (isMobile) {
      return `flex items-center space-x-3 py-2 px-4 rounded-md text-lg font-medium transition-colors duration-200
        ${active ? 'bg-primary-blue text-white' : 'text-light-gray hover:bg-primary-blue/20 hover:text-white'}`;
    } else {
      return `flex items-center space-x-2 text-lg font-medium transition-all duration-300 relative
        ${active ? 'text-primary-blue' : 'text-light-gray hover:text-white'}`;
    }
  };

  return (
    <nav className="bg-primary-dark py-3 px-6 shadow-md fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center h-14">
        <NavLink to="/" className="flex items-center text-white text-2xl font-bold tracking-tight">
          <span className="mr-2 text-primary-blue">🧠</span>
          {appName}
        </NavLink>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
            {isOpen ? '✕' : '☰'}
          </button>
        </div>
        <div className="hidden md:flex space-x-7 items-center">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={getLinkClasses(link.path)}
            >
              <span className="text-xl">{link.icon}</span>
              <span>{link.name}</span>
              {isLinkActive(link.path) && (
                <span className="absolute bottom-[-6px] left-0 w-full h-[3px] bg-primary-blue rounded-full"></span>
              )}
            </NavLink>
          ))}
          {!isAuthenticated ? (
            <NavLink
              to="/login"
              className="ml-8 px-6 py-2 rounded-full text-lg font-semibold bg-secondary-green text-white
                         hover:bg-secondary-green/90 transition-colors duration-300 shadow-md transform hover:scale-105"
            >
              Connexion
            </NavLink>
          ) : (
            <button
              onClick={() => { /* Logique de déconnexion ici */ console.log("Déconnexion"); }}
              className="ml-8 px-6 py-2 rounded-full text-lg font-semibold bg-red-600 text-white
                         hover:bg-red-700 transition-colors duration-300 shadow-md transform hover:scale-105"
            >
              Déconnexion
            </button>
          )}
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-primary-dark border-t border-primary-blue/30 shadow-soft-lg">
          <div className="flex flex-col space-y-3 p-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={getLinkClasses(link.path, true)}
              >
                <span className="text-xl">{link.icon}</span>
                <span>{link.name}</span>
              </NavLink>
            ))}
            {!isAuthenticated ? (
              <NavLink
                to="/login"
                onClick={() => setIsOpen(false)}
                className="py-2 px-4 rounded-md text-lg font-medium bg-secondary-green text-white hover:bg-secondary-green/90 transition-colors duration-200 mt-2 text-center"
              >
                Connexion
              </NavLink>
            ) : (
              <button
                onClick={() => { setIsOpen(false); console.log("Déconnexion mobile"); }}
                className="py-2 px-4 rounded-md text-lg font-medium bg-red-600 text-white hover:bg-red-700 transition-colors duration-200 mt-2 text-center"
              >
                Déconnexion
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;