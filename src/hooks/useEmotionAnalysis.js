// src/hooks/useEmotionAnalysis.js
import { useState, useEffect, useRef } from 'react';

const API_BASE_URL = 'http://127.0.0.1:8000'; // <<--- TRÈS IMPORTANT : Assurez-vous que c'est la bonne URL de votre backend FastAPI

const useEmotionAnalysis = (text) => {
    const [analyzedEmotion, setAnalyzedEmotion] = useState(null);
    const [isLoadingAnalysis, setIsLoadingAnalysis] = useState(false);
    const [errorAnalysis, setErrorAnalysis] = useState(null);
    const debounceTimeoutRef = useRef(null);

    useEffect(() => {
        // Si le texte est vide, réinitialise l'analyse
        if (text.trim().length === 0) {
            setAnalyzedEmotion(null);
            setErrorAnalysis(null);
            setIsLoadingAnalysis(false);
            if (debounceTimeoutRef.current) {
                clearTimeout(debounceTimeoutRef.current);
            }
            return;
        }

        setIsLoadingAnalysis(true);
        setErrorAnalysis(null);

        // Annule le timer précédent pour ne pas faire de requêtes inutiles
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }

        // Définit un nouveau timer pour faire la requête après un court délai (debounce)
        debounceTimeoutRef.current = setTimeout(async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/predict`, { // Appel à l'endpoint /predict pour l'analyse en temps réel
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ text: text }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.detail || 'Erreur lors de l\'analyse du texte');
                }

                const data = await response.json();
                // Adapte la structure de la réponse du backend à ce que le frontend attend
                setAnalyzedEmotion({
                    dominant_emotion: data.emotion,
                    confidence: data.confidence,
                    scores: data.all_scores, // 'all_scores' du backend devient 'scores' pour le frontend
                    reason: `Confiance: ${(data.confidence * 100).toFixed(1)}%` // Une raison simple pour l'affichage
                });
            } catch (err) {
                console.error("Erreur d'analyse API:", err);
                setErrorAnalysis(err.message || 'Impossible de se connecter à l\'API.');
            } finally {
                setIsLoadingAnalysis(false);
            }
        }, 500); // Délai de 500ms avant d'envoyer la requête (ajustable)

        // Fonction de nettoyage pour annuler le timer si le composant est démonté ou si le texte change à nouveau
        return () => {
            if (debounceTimeoutRef.current) {
                clearTimeout(debounceTimeoutRef.current);
            }
        };
    }, [text]); // L'effet se déclenche lorsque le texte change

    return { analyzedEmotion, isLoadingAnalysis, errorAnalysis };
};

export default useEmotionAnalysis;