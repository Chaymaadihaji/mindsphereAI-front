// src/api/apiService.js

const API_BASE_URL = 'http://localhost:8000'; // Assurez-vous que c'est l'URL de votre backend FastAPI

// Endpoint pour l'analyse en temps réel (correspond à votre /predict)
export const analyzeText = async (text) => {
  try {
    const response = await fetch(`${API_BASE_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text_input: text }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`HTTP error! status: ${response.status}, detail: ${errorData.detail}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error analyzing text:", error);
    throw error;
  }
};

// Endpoint pour sauvegarder l'entrée (correspond à votre /journal/analyze)
export const saveJournalEntry = async (entryData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/journal/analyze`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: entryData.user_id,
                text: entryData.text,
                date: entryData.date || new Date().toISOString().split('T')[0]
            }),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`HTTP error! status: ${response.status}, detail: ${errorData.detail}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error saving journal entry:", error);
        throw error;
    }
};

// Endpoint pour récupérer les entrées (correspond à votre /user/{user_id}/entries)
export const getJournalEntries = async (userId, limit = 100) => {
    try {
        if (!userId) {
            // Utilise un ID par défaut si aucun n'est fourni, car chaque utilisateur aura son propre ID
            userId = "single_user_app_id";
            console.warn("getJournalEntries called without a user ID. Defaulting to 'single_user_app_id'.");
        }
        const response = await fetch(`${API_BASE_URL}/user/${userId}/entries?limit=${limit}`);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`HTTP error! status: ${response.status}, detail: ${errorData.detail}`);
        }
        const data = await response.json();
        return data.entries;
    } catch (error) {
        console.error("Error fetching journal entries:", error);
        throw error;
    }
};

// Endpoint pour les recommandations
export const getRecommendations = async (emotion) => {
    try {
        const response = await fetch(`${API_BASE_URL}/recommendations/${emotion}`);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`HTTP error! status: ${response.status}, detail: ${errorData.detail}`);
        }
        const data = await response.json();
        return data.recommendations;
    } catch (error) {
        console.error(`Error fetching recommendations for ${emotion}:`, error);
        throw error;
    }
};

// Endpoint pour les statistiques utilisateur
export const getUserStats = async (userId) => {
    try {
        if (!userId) {
            userId = "single_user_app_id";
            console.warn("getUserStats called without a user ID. Defaulting to 'single_user_app_id'.");
        }
        const response = await fetch(`${API_BASE_URL}/user/${userId}/stats`);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`HTTP error! status: ${response.status}, detail: ${errorData.detail}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching user stats for ${userId}:`, error);
        throw error;
    }
};

// Endpoint pour les statistiques globales (si vous voulez les afficher)
export const getGlobalStats = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/stats`);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`HTTP error! status: ${response.status}, detail: ${errorData.detail}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching global stats:", error);
        throw error;
    }
};