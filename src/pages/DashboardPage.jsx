
import React, { useState, useEffect } from 'react';
import { Pie, Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title, BarElement } from 'chart.js';


import { getEmotionHexColor, emotionColors, getEmotionTextColorClass, getEmotionBackgroundColorClass } from '../utils/emotionColors';


ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title, BarElement);


const mockJournalEntries = [
    
    { timestamp: "2025-06-17T10:00:00Z", dominant_emotion: "joy", score: 0.9 }, 
    { timestamp: "2025-06-17T14:00:00Z", dominant_emotion: "love", score: 0.85 }, 
    { timestamp: "2025-06-16T12:00:00Z", dominant_emotion: "sadness", score: 0.6 },
    { timestamp: "2025-06-15T15:00:00Z", dominant_emotion: "joy", score: 0.8 },
    { timestamp: "2025-06-14T09:00:00Z", dominant_emotion: "anger", score: 0.5 },
    { timestamp: "2025-06-13T18:00:00Z", dominant_emotion: "surprise", score: 0.9 },
    { timestamp: "2025-06-12T11:00:00Z", dominant_emotion: "joy", score: 0.85 },
    { timestamp: "2025-06-11T14:00:00Z", dominant_emotion: "love", score: 0.7 },
    
    
    { timestamp: "2025-06-10T17:00:00Z", dominant_emotion: "sadness", score: 0.75 },
    { timestamp: "2025-06-08T08:00:00Z", dominant_emotion: "fear", score: 0.6 },
    { timestamp: "2025-06-05T13:00:00Z", dominant_emotion: "joy", score: 0.92 },
    { timestamp: "2025-06-01T16:00:00Z", dominant_emotion: "love", score: 0.8 },
    { timestamp: "2025-05-28T10:00:00Z", dominant_emotion: "anger", score: 0.65 },
    { timestamp: "2025-05-25T19:00:00Z", dominant_emotion: "surprise", score: 0.8 },
    { timestamp: "2025-05-22T22:00:00Z", dominant_emotion: "love", score: 0.95 },
    { timestamp: "2025-05-20T07:00:00Z", dominant_emotion: "sadness", score: 0.88 },
    
    
    { timestamp: "2025-05-15T11:00:00Z", dominant_emotion: "joy", score: 0.91 },
    { timestamp: "2025-05-10T14:00:00Z", dominant_emotion: "sadness", score: 0.7 },
    { timestamp: "2025-05-05T16:00:00Z", dominant_emotion: "fear", score: 0.75 },
    { timestamp: "2025-04-30T09:00:00Z", dominant_emotion: "joy", score: 0.87 },
    { timestamp: "2025-04-25T12:00:00Z", dominant_emotion: "anger", score: 0.7 },
];


const emotionScoresMapping = {
    joy: 5,
    love: 4.5,
    surprise: 3.5,
    sadness: 1.5,
    anger: 0.5,
    fear: 0.2,
};

const DashboardPage = () => {
    const [journalEntries, setJournalEntries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [timeRange, setTimeRange] = useState('7_days');

    useEffect(() => {
       
        setTimeout(() => {
            setJournalEntries(mockJournalEntries);
            setLoading(false);
        }, 1000);
    }, []);

 
    const getFilteredEntries = () => {
        const now = new Date();
        return journalEntries.filter(entry => {
            const entryDate = new Date(entry.timestamp);
            if (timeRange === '7_days') {
                const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                return entryDate >= sevenDaysAgo;
            }
            if (timeRange === '30_days') {
                const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
                return entryDate >= thirtyDaysAgo;
            }
            return true;// 'all_time'
        });
    };

    const filteredEntries = getFilteredEntries();


    const totalEntries = filteredEntries.length;

    const emotionCounts = filteredEntries.reduce((acc, entry) => {
        const emotion = entry.dominant_emotion.toLowerCase();
        if (emotionScoresMapping.hasOwnProperty(emotion)) {
            acc[emotion] = (acc[emotion] || 0) + 1;
        }
        return acc;
    }, {});

    const sortedEmotions = Object.entries(emotionCounts).sort(([, a], [, b]) => b - a);
    const dominantEmotion = sortedEmotions.length > 0 ? sortedEmotions[0][0] : 'joy';

    const averageEmotionScore = filteredEntries.length > 0
        ? filteredEntries.reduce((sum, entry) => {
            const emotion = entry.dominant_emotion.toLowerCase();
            return sum + (emotionScoresMapping[emotion] || 0);
        }, 0) / filteredEntries.length
        : emotionScoresMapping.joy;

    const averageScoreLabel = () => {
        if (averageEmotionScore >= 4) return 'Very Positive';
        if (averageEmotionScore >= 3) return 'Positive';
        if (averageEmotionScore >= 2) return 'Neutral';
        if (averageEmotionScore >= 1) return 'Negative';
        return 'Very Negative';
    };

  
    const pieChartLabels = Object.keys(emotionCounts).map(emotionKey => 
        emotionColors[emotionKey]?.name || emotionKey.charAt(0).toUpperCase() + emotionKey.slice(1)
    );
    const pieChartDataValues = Object.values(emotionCounts);
    const pieChartColors = Object.keys(emotionCounts).map(emotionKey => getEmotionHexColor(emotionKey));

    const pieData = {
        labels: pieChartLabels,
        datasets: [
            {
                data: pieChartDataValues,
                backgroundColor: pieChartColors,
                borderColor: '#ffffff',
                borderWidth: 2,
            },
        ],
    };

    const pieOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    color: '#333',
                    font: {
                        size: 14,
                    },
                },
            },
            title: {
                display: true,
                text: 'Your Emotion Distribution',
                font: {
                    size: 18,
                    weight: 'bold',
                },
                color: '#333',
            },
        },
    };

   
    const moodEvolutionData = filteredEntries
        .map(entry => ({
            date: new Date(entry.timestamp),
            score: emotionScoresMapping[entry.dominant_emotion.toLowerCase()] || 0
        }))
        .sort((a, b) => a.date - b.date);

  
    const dailyScores = moodEvolutionData.reduce((acc, entry) => {
        const dateStr = entry.date.toDateString();
        if (!acc[dateStr]) {
            acc[dateStr] = { sum: 0, count: 0, date: entry.date };
        }
        acc[dateStr].sum += entry.score;
        acc[dateStr].count += 1;
        return acc;
    }, {});

    const aggregatedMoodData = Object.values(dailyScores)
        .map(daily => ({
            date: daily.date,
            averageScore: daily.sum / daily.count
        }))
        .sort((a, b) => a.date - b.date);

    const lineChartLabels = aggregatedMoodData.map(data => data.date.toLocaleDateString('en-US'));
    const lineChartValues = aggregatedMoodData.map(data => data.averageScore);

    const lineData = {
        labels: lineChartLabels,
        datasets: [
            {
                label: 'Average Emotional Score',
                data: lineChartValues,
                fill: false,
                borderColor: '#5B8C51',
                tension: 0.1,
                pointBackgroundColor: '#5B8C51',
                pointBorderColor: '#fff',
                pointHoverRadius: 8,
                pointHoverBackgroundColor: '#5B8C51',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointBorderWidth: 2,
                pointRadius: 5,
            },
        ],
    };

    const lineOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: 'Evolution of Your Emotional Score',
                font: {
                    size: 18,
                    weight: 'bold',
                },
                color: '#333',
            },
        },
        scales: {
            x: {
                type: 'category',
                ticks: {
                    color: '#555',
                },
                grid: {
                    color: 'rgba(200, 200, 200, 0.2)',
                },
            },
            y: {
                min: 0,
                max: 5,
                ticks: {
                    color: '#555',
                    callback: function (value) {
                        if (value === emotionScoresMapping.fear) return 'Fear';
                        if (value === emotionScoresMapping.anger) return 'Anger';
                        if (value === emotionScoresMapping.sadness) return 'Sadness';
                        if (value === emotionScoresMapping.surprise) return 'Surprise';
                        if (value === emotionScoresMapping.love) return 'Love';
                        if (value === emotionScoresMapping.joy) return 'Joy';
                        return '';
                    }
                },
                grid: {
                    color: 'rgba(200, 200, 200, 0.2)',
                },
            },
        },
    };

   
    const barChartLabels = Object.keys(emotionCounts).map(emotionKey => 
        emotionColors[emotionKey]?.name || emotionKey.charAt(0).toUpperCase() + emotionKey.slice(1)
    );
    const barChartDataValues = Object.values(emotionCounts);
    const barChartColors = Object.keys(emotionCounts).map(emotionKey => getEmotionHexColor(emotionKey));

    const barData = {
        labels: barChartLabels,
        datasets: [
            {
                label: 'Number of Entries',
                data: barChartDataValues,
                backgroundColor: barChartColors,
            },
        ],
    };

    const barOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: 'Number of Entries by Emotion',
                font: {
                    size: 18,
                    weight: 'bold',
                },
                color: '#333',
            },
        },
        scales: {
            x: {
                ticks: {
                    color: '#555',
                },
                grid: {
                    color: 'rgba(200, 200, 200, 0.2)',
                },
            },
            y: {
                ticks: {
                    color: '#555',
                    beginAtZero: true,
                    stepSize: 1,
                },
                grid: {
                    color: 'rgba(200, 200, 200, 0.2)',
                },
            },
        },
    };

    if (loading) return <p className="text-center text-primary text-xl mt-12">Loading dashboard...</p>;
    if (error) return <p className="text-center text-red-500 text-xl mt-12">Error: Unable to load data: {error}</p>;
    if (totalEntries === 0) return (
        <div className="p-6 bg-background_light min-h-[calc(100vh-160px)]">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text_primary mb-8 text-center">Your Analytical Dashboard</h1>
            <p className="text-center text-text_secondary text-xl p-8 bg-white shadow-lg rounded-xl mt-12">
                No journal entries for the selected period to generate the dashboard. Try changing the time range or adding new entries.
            </p>
        </div>
    );

    return (
        <div className="p-6 bg-background_light min-h-[calc(100vh-160px)]">
             // Dans src/pages/JournalPage.jsx
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text_primary mb-8 text-center">Your Analytical Dashboard</h1>
              
         
            <div className="flex justify-center mb-8 space-x-4">
                <button
                    onClick={() => setTimeRange('7_days')}
                    className={`px-6 py-2 rounded-full text-lg font-semibold transition-colors duration-300 ${
                        timeRange === '7_days' ? 'bg-primary text-white shadow-md' : 'bg-white text-text_secondary hover:bg-gray-100'
                    }`}
                >
                    Last 7 Days
                </button>
                <button
                    onClick={() => setTimeRange('30_days')}
                    className={`px-6 py-2 rounded-full text-lg font-semibold transition-colors duration-300 ${
                        timeRange === '30_days' ? 'bg-primary text-white shadow-md' : 'bg-white text-text_secondary hover:bg-gray-100'
                    }`}
                >
                    Last 30 Days
                </button>
                <button
                    onClick={() => setTimeRange('all_time')}
                    className={`px-6 py-2 rounded-full text-lg font-semibold transition-colors duration-300 ${
                        timeRange === 'all_time' ? 'bg-primary text-white shadow-md' : 'bg-white text-text_secondary hover:bg-gray-100'
                    }`}
                >
                    All Time
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">

                <div className="bg-white p-8 rounded-xl shadow-lg border border-border_light flex flex-col justify-center items-center">
                    <h2 className="text-2xl font-semibold text-text_primary mb-4">Your Global Summary</h2>
                    <p className="text-lg text-text_secondary mb-2">
                        Total Entries: <span className="font-bold text-primary-dark">{totalEntries}</span>
                    </p>
                    <p className="text-lg text-text_secondary">
                        Average Mood Trend:
                        <span className={`font-bold ml-2 ${getEmotionTextColorClass(dominantEmotion)}`}>
                            {averageScoreLabel()}
                        </span>
                    </p>
                    <p className="text-lg text-text_secondary mt-2">
                        Most Frequent Emotion:
                        <span className={`font-bold ml-2 ${getEmotionTextColorClass(dominantEmotion)}`}>
                            {emotionColors[dominantEmotion]?.name || dominantEmotion.charAt(0).toUpperCase() + dominantEmotion.slice(1)}
                        </span>
                        <span className="ml-1">{emotionColors[dominantEmotion]?.icon}</span>
                    </p>
                </div>

            
                <div className="bg-white p-8 rounded-xl shadow-lg border border-border_light flex justify-center items-center h-96">
                    <div className="w-full max-w-lg h-full">
                        <Pie data={pieData} options={pieOptions} />
                    </div>
                </div>

                
                <div className="bg-white p-8 rounded-xl shadow-lg border border-border_light h-96">
                    <Line data={lineData} options={lineOptions} />
                </div>

               
                <div className="bg-white p-8 rounded-xl shadow-lg border border-border_light h-96">
                    <Bar data={barData} options={barOptions} />
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;