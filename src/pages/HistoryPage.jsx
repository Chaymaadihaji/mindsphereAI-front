
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; 
import { getEmotionBackgroundColorClass, emotionColors, getEmotionTextColorClass } from '../utils/emotionColors';


const mockEntries = [
    { timestamp: "2025-06-01T10:00:00Z", dominant_emotion: "joy", text: "Beautiful day in the sun, full of energy!" },
    { timestamp: "2025-06-01T15:30:00Z", dominant_emotion: "optimism", text: "Can't wait to start the new project tomorrow." },
    { timestamp: "2025-06-02T09:00:00Z", dominant_emotion: "stress", text: "Lots of work to do, I feel a bit under pressure." },
    { timestamp: "2025-06-02T18:00:00Z", dominant_emotion: "sadness", text: "Bad news from a friend, it made me sad." },
    { timestamp: "2025-06-03T11:00:00Z", dominant_emotion: "neutral", text: "Quiet day, nothing special." },
    { timestamp: "2025-06-04T13:00:00Z", dominant_emotion: "joy", text: "Great meeting with family." },
    { timestamp: "2025-06-05T08:00:00Z", dominant_emotion: "anger", text: "Technical issue that frustrated me this morning." },
    { timestamp: "2025-06-06T16:00:00Z", dominant_emotion: "optimism", text: "Good progress on the project, it motivates me." },
    { timestamp: "2025-06-07T20:00:00Z", dominant_emotion: "love", text: "Pleasant evening with my partner." },
    { timestamp: "2025-06-08T14:00:00Z", dominant_emotion: "joy", text: "Discovered a fascinating new book." },
    { timestamp: "2025-06-08T19:00:00Z", dominant_emotion: "relief", text: "Finally finished that big file!" },
    { timestamp: "2025-06-09T10:00:00Z", dominant_emotion: "anticipation", text: "New week, new challenges, I'm looking forward to it." },
    { timestamp: "2025-06-09T10:30:00Z", dominant_emotion: "stress", text: "Starting the week with a lot of emails." },
];


const HistoryPage = () => {
    
    const [selectedDate, setSelectedDate] = useState(new Date());
   
    const [searchTerm, setSearchTerm] = useState('');

 
    const handleDateChange = (date) => {
        setSelectedDate(date);
        setSearchTerm(''); 
    };

   
    const filteredEntriesByDate = mockEntries.filter(entry => {
        const entryDate = new Date(entry.timestamp);
      
        return entryDate.toDateString() === selectedDate.toDateString();
    });

   
    const filteredEntriesBySearch = filteredEntriesByDate.filter(entry =>
        entry.text.toLowerCase().includes(searchTerm.toLowerCase())
    );

   
    const tileClassName = ({ date, view }) => {
        if (view === 'month') {
            const hasEntry = mockEntries.some(entry => {
                const entryDate = new Date(entry.timestamp);
                return entryDate.toDateString() === date.toDateString();
            });
          
            return hasEntry ? 'has-entry' : null;
        }
        return null;
    };

  
    if (mockEntries.length === 0) {
        return (
            <p className="text-center text-text_secondary text-xl p-8 bg-white shadow-lg rounded-xl">
                No entries in your history yet. Add mocked data!
            </p>
        );
    }

    return (
        <div className="p-6 bg-background_light min-h-[calc(100vh-160px)]">
             // Dans src/pages/JournalPage.jsx
            <h1 className="text-4xl font-bold text-text_primary mb-8 text-center">Your Entry History</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               
                <div className="bg-white p-8 rounded-xl shadow-lg border border-border_light flex flex-col items-center">
                     // Dans src/pages/JournalPage.jsx
                    <h2 className="text-2xl font-semibold text-text_primary mb-6">Navigate by Date</h2>
                    <Calendar
                        onChange={handleDateChange}
                        value={selectedDate}
                        className="react-calendar w-full max-w-md mx-auto"
                        tileClassName={tileClassName}
                        locale="en-US" 
                    />
                    <p className="text-text_secondary mt-4">
                        Selected Date: <span className="font-semibold">{selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </p>
                </div>

             
                <div className="bg-white p-8 rounded-xl shadow-lg border border-border_light">
                    <h2 className="text-2xl font-semibold text-text_primary mb-6">Entries for {selectedDate.toLocaleDateString('en-US')}</h2>

                    <input
                        type="text"
                        placeholder="Search daily entries..."
                        className="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-primary text-text_secondary"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    {filteredEntriesBySearch.length > 0 ? (
                        <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                            {filteredEntriesBySearch.map((entry, index) => (
                                <div key={index} className="bg-background_dark p-4 rounded-lg shadow-sm border border-border_light">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm text-gray-500">{new Date(entry.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getEmotionBackgroundColorClass(entry.dominant_emotion)}`}>
                                            {emotionColors[entry.dominant_emotion.toLowerCase()]?.name || entry.dominant_emotion}
                                        </span>
                                    </div>
                                    <p className="text-text_primary text-lg">{entry.text}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-text_secondary italic">No entries found for this date or your search.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HistoryPage;