

import React, { useState, useEffect } from 'react';
import { getEmotionHexColor, emotionColors, getEmotionTextColorClass } from '../utils/emotionColors';


const mockEntries = [ 
    { timestamp: "2025-06-01T10:00:00Z", dominant_emotion: "joy", text: "Beautiful sunny day, full of energy!" },
    { timestamp: "2025-06-01T15:30:00Z", dominant_emotion: "optimism", text: "Can't wait to start the new project tomorrow." },
    { timestamp: "2025-06-02T09:00:00Z", dominant_emotion: "stress", text: "Lots of work to do, feeling a bit pressured." },
    { timestamp: "2025-06-02T18:00:00Z", dominant_emotion: "sadness", text: "Bad news from a friend, it made me sad." },
    { timestamp: "2025-06-03T11:00:00Z", dominant_emotion: "neutral", text: "Quiet day, nothing special." },
    { timestamp: "2025-06-04T13:00:00Z", dominant_emotion: "joy", text: "Great meeting with family." },
    { timestamp: "2025-06-05T08:00:00Z", dominant_emotion: "anger", text: "Technical issue that frustrated me this morning." },
    { timestamp: "2025-06-06T16:00:00Z", dominant_emotion: "optimism", text: "Good progress on the project, it motivates me." },
    { timestamp: "2025-06-07T20:00:00Z", dominant_emotion: "love", text: "Enjoyable evening with my partner." },
    { timestamp: "2025-06-08T14:00:00Z", dominant_emotion: "joy", text: "Discovered a new exciting book." },
    { timestamp: "2025-06-08T19:00:00Z", dominant_emotion: "relief", text: "Finally finished that big file!" },
    { timestamp: "2025-06-09T10:00:00Z", dominant_emotion: "anticipation", text: "New week, new challenges, looking forward to it." },
    { timestamp: "2025-06-09T10:30:00Z", dominant_emotion: "stress", text: "Starting the week with a lot of emails." },
];

const mockRecommendations = [
    { title: "Deep Breathing", description: "Practice heart coherence to calm your mind.", activity: "Meditation, Breathing exercises" },
    { title: "Nature Walk", description: "Spend time outdoors to reconnect with yourself.", activity: "Walking, Hiking" },
    { title: "Write Your Thoughts", description: "Continue journaling to better understand your emotions.", activity: "Journaling" },
    { title: "Listen to Soothing Music", description: "Create a relaxing playlist to unwind.", activity: "Music" },
];


const InsightsPage = () => {
    const [entries, setEntries] = useState([]);
    const [userStats, setUserStats] = useState(null); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [recommendations, setRecommendations] = useState([]);



    useEffect(() => {
      
        setTimeout(() => {
            setEntries(mockEntries);
    
            setRecommendations(mockRecommendations);
            setLoading(false);
            setError(null);
        }, 500);
    }, []);

    const detectPatterns = () => {
        const dayOfWeekDistribution = {};
        const timeOfDayDistribution = {};

        entries.forEach(entry => {
            const date = new Date(entry.timestamp);
            const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
            const hour = date.getHours();

            if (!dayOfWeekDistribution[dayOfWeek]) dayOfWeekDistribution[dayOfWeek] = {};
            dayOfWeekDistribution[dayOfWeek][entry.dominant_emotion.toLowerCase()] = (dayOfWeekDistribution[dayOfWeek][entry.dominant_emotion.toLowerCase()] || 0) + 1;

            let timeOfDay;
            if (hour >= 5 && hour < 12) timeOfDay = 'morning';
            else if (hour >= 12 && hour < 18) timeOfDay = 'afternoon';
            else timeOfDay = 'evening/night';

            if (!timeOfDayDistribution[timeOfDay]) timeOfDayDistribution[timeOfDay] = {};
            timeOfDayDistribution[timeOfDay][entry.dominant_emotion.toLowerCase()] = (timeOfDayDistribution[timeOfDay][entry.dominant_emotion.toLowerCase()] || 0) + 1;
        });

        const patterns = [];

        
        for (const day in dayOfWeekDistribution) {
            const dayEmotions = dayOfWeekDistribution[day];
            
            const dominantEmotion = Object.keys(dayEmotions).reduce((a, b) =>
                dayEmotions[a] > dayEmotions[b] ? a : b, null);
            
            if (dominantEmotion && dayEmotions[dominantEmotion] > 1) {
                patterns.push(`You often feel <span class="${getEmotionTextColorClass(dominantEmotion)} font-semibold">${emotionColors[dominantEmotion]?.name || dominantEmotion}</span> on ${day}s.`);
            }
        }

    
        for (const time in timeOfDayDistribution) {
            const timeEmotions = timeOfDayDistribution[time];
            const dominantEmotion = Object.keys(timeEmotions).reduce((a, b) =>
                timeEmotions[a] > timeEmotions[b] ? a : b, null);
            if (dominantEmotion && timeEmotions[dominantEmotion] > 1) {
                patterns.push(`Your mood is often <span class="${getEmotionTextColorClass(dominantEmotion)} font-semibold">${emotionColors[dominantEmotion]?.name || dominantEmotion}</span> in the ${time}.`);
            }
        }

        return patterns.length > 0 ? patterns : ["No significant patterns detected yet. Write more for more insights!"];
    };

    const detectedPatterns = detectPatterns();

    if (loading) return <p className="text-center text-primary text-xl">Loading Insights...</p>;
    if (error) return <p className="text-center text-red-500 text-xl">Error: {error}</p>;
    if (entries.length === 0) return <p className="text-center text-text_secondary text-xl p-8 bg-white shadow-lg rounded-xl">Write some journal entries to start discovering insights.</p>;

    return (
        <div className="p-6 bg-background_light min-h-[calc(100vh-160px)]">
             // Dans src/pages/JournalPage.jsx
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text_primary mb-8 text-center">Your Insights & Discoveries</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-xl shadow-lg border border-border_light">
                    <h2 className="text-2xl font-semibold text-text_primary mb-6">Your Emotional Patterns</h2>
                    <ul className="space-y-4">
                        {detectedPatterns.map((pattern, index) => (
                            <li key={index} className="bg-background_dark p-4 rounded-lg border-l-4 border-primary text-text_secondary">
                                <p dangerouslySetInnerHTML={{ __html: pattern }} />
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-lg border border-border_light">
                    <h2 className="text-2xl font-semibold text-text_primary mb-6">Personalized Recommendations</h2>
                    {recommendations.length > 0 ? (
                        <ul className="space-y-4">
                            {recommendations.map((rec, index) => (
                                <li key={index} className="bg-background_dark p-4 rounded-lg border-l-4 border-secondary text-text_secondary">
                                    <h3 className="font-semibold text-text_primary">{rec.title}</h3>
                                    <p className="text-sm mt-1">{rec.description}</p>
                                    {rec.activity && (
                                        <p className="text-xs text-gray-500 mt-2">Suggested activity: {rec.activity}</p>
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">No recommendations found yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InsightsPage;