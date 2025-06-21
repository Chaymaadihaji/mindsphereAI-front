import React, { useState, useEffect } from 'react';

import {
    getEmotionTextColorClass,
    getEmotionBackgroundColorClass,
    getEmotionIcon,
    emotionColors,
    getEmotionHexColor
} from '../utils/emotionColors'; 

import useEmotionAnalysis from '../hooks/useEmotionAnalysis'; 


const API_BASE_URL = 'http://127.0.0.1:8000';

const JournalPage = () => {
    const [journalText, setJournalText] = useState('');
    
    const { analyzedEmotion, isLoadingAnalysis, errorAnalysis } = useEmotionAnalysis(journalText);

  
    const [savedEntries, setSavedEntries] = useState([]);

    
    useEffect(() => {
        const loadInitialEntries = async () => {
            try {
              
                const userId = 'default_user';
             
                const response = await fetch(`${API_BASE_URL}/user/${userId}/entries?limit=10`); 

                if (response.ok) {
                    const data = await response.json();
                    
                    const formattedEntries = data.entries.map(entry => ({
                        id: entry.entry_id,
                        date: new Date(entry.timestamp).toLocaleDateString('en-US'), 
                        emotion: entry.emotion,
                        text: entry.text,
                        all_scores: entry.all_scores,
                        timestamp: entry.timestamp,
                        recommendations: entry.recommendations || [] 
                    }));
                    setSavedEntries(formattedEntries.reverse());
                } else {
                    console.error("Error loading existing entries:", response.status, response.statusText); 
                    setSavedEntries([]);
                }
            } catch (error) {
                console.error("Network error loading entries:", error); 
                setSavedEntries([]);
            }
        };

        loadInitialEntries();
    }, []);


    const handleSaveEntry = async () => {
        if (!journalText.trim()) {
            return;
        }

        try {
            const userId = "default_user";
            const entryDate = new Date().toISOString();

            const response = await fetch(`${API_BASE_URL}/journal/analyze`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: journalText.trim(),
                    user_id: userId,
                    date: entryDate,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Failed to save entry.'); 
            }

            const newEntryData = await response.json();

           
            setSavedEntries([newEntryData, ...savedEntries]);
            setJournalText('');

            console.log("Entry saved via API:", newEntryData); 

        } catch (err) {
            console.error("Error saving entry:", err.message); 
            alert(`Error saving: ${err.message}. Check console for more details.`); 
        }
    };

    return (
        <div className="min-h-screen bg-background_light text-text_primary pt-8 pb-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            // Dans src/pages/JournalPage.jsx

<h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-10 text-center text-primary-dark w-full whitespace-normal">
    Your Reflection Space
</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                   
                    <div className="md:col-span-2 bg-white p-8 rounded-2xl shadow-xl border border-border_light transform transition-transform duration-300 hover:scale-[1.01]">
                        <h2 className="text-3xl font-bold mb-6 text-text_primary">
                            Write Your Experience 
                        </h2>
                        <p className="text-lg text-text_secondary mb-6">
                            Today: <span className="font-semibold">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span> {/* Changed to 'en-US' */}
                        </p>

                        <textarea
                            className="w-full p-4 border border-border_light rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 text-lg min-h-[200px] resize-y"
                            placeholder="Write your thoughts, feelings, your day here... Letting your emotions express themselves is the first step towards self-understanding." /* Translated */
                            value={journalText}
                            onChange={(e) => setJournalText(e.target.value)}
                        ></textarea>

                        <button
                            onClick={handleSaveEntry}
                            className="mt-6 w-full md:w-auto px-8 py-3 bg-primary text-white text-lg font-semibold rounded-full shadow-lg hover:bg-primary-dark transition-colors duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={!journalText.trim()}
                        >
                            Save Entry 
                        </button>
                    </div>

                  
                    <div className="md:col-span-1 bg-white p-8 rounded-2xl shadow-xl border border-border_light transform transition-transform duration-300 hover:scale-[1.01]">
                        <h2 className="text-3xl font-bold mb-6 text-text_primary">
                            Real-time Analysis 
                        </h2>
                        {isLoadingAnalysis ? (
                            <p className="text-text_secondary text-center">Analyzing...</p> 
                        ) : errorAnalysis ? (
                            <p className="text-red-500 text-center">Analysis Error: {errorAnalysis}</p> 
                        ) : analyzedEmotion && journalText.length > 0 ? (
                            <div className="flex flex-col items-center justify-center space-y-4">
                                <div
                                    className={`p-4 rounded-full ${getEmotionBackgroundColorClass(analyzedEmotion.dominant_emotion)}`}
                                >
                                    <span className="text-6xl">
                                        {getEmotionIcon(analyzedEmotion.dominant_emotion)}
                                    </span>
                                </div>
                                <p className={`text-xl font-bold ${getEmotionTextColorClass(analyzedEmotion.dominant_emotion)}`}>
                                    {emotionColors[analyzedEmotion.dominant_emotion.toLowerCase()]?.name || 'Neutral'} 
                                </p>
                                <p className="text-text_secondary text-center">{analyzedEmotion.reason || "Dominant emotion detected."}</p> 

                                {analyzedEmotion.scores && (
                                    <div className="w-full mt-4">
                                        <h3 className="text-lg font-semibold mb-2">Emotion Scores:</h3> 
                                        <ul className="space-y-1">
                                            {Object.entries(analyzedEmotion.scores)
                                                .sort(([, scoreA], [, scoreB]) => scoreB - scoreA)
                                                .map(([emotion, score]) => (
                                                    <li key={emotion} className="flex justify-between items-center text-sm text-text_secondary">
                                                        <span>{emotionColors[emotion.toLowerCase()]?.name || emotion}:</span>
                                                        <span className={`font-semibold ${getEmotionTextColorClass(emotion)}`}>{(score * 100).toFixed(1)}%</span>
                                                    </li>
                                                ))}
                                        </ul>
                                    </div>
                                )}

                               
                                {analyzedEmotion.recommendations && analyzedEmotion.recommendations.length > 0 && (
                                    <div className="w-full mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                                        <h3 className="text-lg font-semibold mb-2 text-text_primary">Recommendations:</h3> 
                                        <ul className="list-disc list-inside space-y-1 text-text_secondary">
                                            {analyzedEmotion.recommendations.map((rec, index) => (
                                                <li key={index}>{rec}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <p className="text-text_secondary text-center">Start writing to see your emotions analyzed in real-time.</p> 
                        )}
                    </div>
                </div>

               
                <div className="mt-12 bg-white p-8 rounded-2xl shadow-xl border border-border_light transform transition-transform duration-300 hover:scale-[1.005]">
                    <h2 className="text-3xl font-bold mb-6 text-text_primary">
                        Your Entry History 
                    </h2>
                    {savedEntries.length > 0 ? (
                        <div className="space-y-4">
                            {savedEntries.map((entry) => (
                                <div key={entry.entry_id} className={`p-5 rounded-lg shadow-md border-l-8 ${getEmotionBackgroundColorClass(entry.emotion)}`}
                                    style={{ borderColor: getEmotionHexColor(entry.emotion) }}>
                                    <p className="text-sm text-gray-500 mb-2">{new Date(entry.timestamp).toLocaleDateString('en-US')}</p> 
                                    <h3 className={`text-xl font-semibold mb-2 ${getEmotionTextColorClass(entry.emotion)}`}>
                                        <span className="mr-2">{getEmotionIcon(entry.emotion)}</span>
                                        {emotionColors[entry.emotion.toLowerCase()]?.name || entry.emotion}
                                    </h3>
                                    <p className="text-text_secondary leading-relaxed">{entry.text}</p>

                                    {entry.all_scores && (
                                        <div className="w-full mt-4">
                                            <h4 className="text-md font-semibold mb-1">Detailed Scores:</h4> 
                                            <ul className="space-y-0.5 text-sm">
                                                {Object.entries(entry.all_scores)
                                                    .sort(([, scoreA], [, scoreB]) => scoreB - scoreA)
                                                    .map(([emotion, score]) => (
                                                        <li key={emotion} className="flex justify-between items-center text-xs text-text_secondary">
                                                            <span>{emotionColors[emotion.toLowerCase()]?.name || emotion}:</span>
                                                            <span className={`font-semibold ${getEmotionTextColorClass(emotion)}`}>{(score * 100).toFixed(1)}%</span>
                                                        </li>
                                                    ))}
                                            </ul>
                                        </div>
                                    )}

                                    
                                    {entry.recommendations && entry.recommendations.length > 0 && (
                                        <div className="w-full mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                                            <h4 className="text-md font-semibold mb-1 text-text_primary">Recommendations:</h4> {/* Translated */}
                                            <ul className="list-disc list-inside space-y-0.5 text-text_secondary">
                                                {entry.recommendations.map((rec, index) => (
                                                    <li key={index}>{rec}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-text_secondary text-center">No journal entries saved yet.</p> 
                    )}
                </div>
            </div>
        </div>
    );
};

export default JournalPage;