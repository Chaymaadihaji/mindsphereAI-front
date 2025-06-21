
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PatientManagementPage = ({ onSelectPatient, currentPatientId }) => {

  const [patients, setPatients] = useState([
    { id: 'patient_001', name: 'Leila Benali' },
    { id: 'patient_002', name: 'Omar El Fassi' },
    { id: 'patient_003', name: 'Fatima Zahra' },
  ]);
  const [newPatientName, setNewPatientName] = useState('');
  const navigate = useNavigate();

  const handleSelectPatient = (patientId) => {
    onSelectPatient(patientId);
    navigate('/'); 
  };

  const handleAddPatient = (e) => {
    e.preventDefault();
    if (newPatientName.trim()) {
      const newId = `patient_${Date.now()}`; 
      setPatients([...patients, { id: newId, name: newPatientName.trim() }]);
      setNewPatientName(''); 
    }
  };

  return (
    <div className="p-6 bg-background_light min-h-[calc(100vh-160px)]">
      <h1 className="text-4xl font-bold text-text_primary mb-8 text-center">Gestion des Patients</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        <div className="bg-white p-8 rounded-xl shadow-lg border border-border_light">
          <h2 className="text-2xl font-semibold text-text_primary mb-6">Ajouter un Nouveau Patient</h2>
          <form onSubmit={handleAddPatient} className="space-y-4">
            <div>
              <label htmlFor="newPatientName" className="block text-sm font-medium text-text_secondary mb-2">Nom du Patient</label>
              <input
                type="text"
                id="newPatientName"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                value={newPatientName}
                onChange={(e) => setNewPatientName(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition duration-200 shadow-md"
            >
              Ajouter Patient
            </button>
          </form>
        </div>

      
        <div className="bg-white p-8 rounded-xl shadow-lg border border-border_light">
          <h2 className="text-2xl font-semibold text-text_primary mb-6">Vos Patients</h2>
          {patients.length > 0 ? (
            <ul className="space-y-4 max-h-96 overflow-y-auto pr-2">
              {patients.map((patient) => (
                <li
                  key={patient.id}
                  className={`flex justify-between items-center p-4 rounded-lg shadow-sm border ${currentPatientId === patient.id ? 'bg-primary/10 border-primary' : 'bg-background_dark border-border_light'} hover:bg-primary/5 transition-colors duration-200 cursor-pointer`}
                  onClick={() => handleSelectPatient(patient.id)}
                >
                  <span className="text-lg font-medium text-text_primary">{patient.name}</span>
                  {currentPatientId === patient.id && (
                    <span className="text-sm text-primary font-semibold">Actif</span>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-text_secondary italic">Aucun patient ajouté pour l'instant.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientManagementPage;