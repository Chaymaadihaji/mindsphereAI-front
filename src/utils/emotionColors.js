// src/utils/emotionColors.js

export const emotionColors = {
    joy: { name: 'Joy', hex: '#FFD700', textClass: 'text-yellow-500', bgClass: 'bg-yellow-100', icon: '😊' },
    sadness: { name: 'Sadness', hex: '#6495ED', textClass: 'text-blue-500', bgClass: 'bg-blue-100', icon: '😢' },
    anger: { name: 'Anger', hex: '#DC143C', textClass: 'text-red-500', bgClass: 'bg-red-100', icon: '😡' },
    fear: { name: 'Fear', hex: '#8A2BE2', textClass: 'text-purple-500', bgClass: 'bg-purple-100', icon: '😨' },
    disgust: { name: 'Disgust', hex: '#3CB371', textClass: 'text-green-500', bgClass: 'bg-green-100', icon: '🤢' },
    surprise: { name: 'Surprise', hex: '#FFA500', textClass: 'text-orange-500', bgClass: 'bg-orange-100', icon: '😮' },
    neutral: { name: 'Neutral', hex: '#A9A9A9', textClass: 'text-gray-500', bgClass: 'bg-gray-100', icon: '😐' },
    optimism: { name: 'Optimism', hex: '#00CED1', textClass: 'text-teal-500', bgClass: 'bg-teal-100', icon: '✨' },
    love: { name: 'Love', hex: '#FF69B4', textClass: 'text-pink-500', bgClass: 'bg-pink-100', icon: '❤️' },
    stress: { name: 'Stress', hex: '#FF4500', textClass: 'text-red-600', bgClass: 'bg-red-200', icon: '😬' },
    relief: { name: 'Relief', hex: '#90EE90', textClass: 'text-lime-500', bgClass: 'bg-lime-100', icon: '😌' },
    anticipation: { name: 'Anticipation', hex: '#4682B4', textClass: 'text-sky-500', bgClass: 'bg-sky-100', icon: '🤔' },
    // Add other emotions if necessary
};

export const getEmotionHexColor = (emotion) => {
    return emotionColors[emotion.toLowerCase()]?.hex || '#CCCCCC'; // Default gray
};

export const getEmotionTextColorClass = (emotion) => {
    return emotionColors[emotion.toLowerCase()]?.textClass || 'text-gray-700'; // Default text color
};

export const getEmotionBackgroundColorClass = (emotion) => { // <--- C'EST CETTE FONCTION QUI EST EXPORTÉE
    return emotionColors[emotion.toLowerCase()]?.bgClass || 'bg-gray-200'; // Default background color
};

export const getEmotionIcon = (emotion) => {
    return emotionColors[emotion.toLowerCase()]?.icon || '❓'; // Default icon
};

// Function to get all available emotions
export const getAllEmotions = () => {
    return Object.keys(emotionColors).map(key => ({
        id: key,
        name: emotionColors[key].name,
        hex: emotionColors[key].hex,
        icon: emotionColors[key].icon
    }));
};