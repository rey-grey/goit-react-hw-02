import { useState, useEffect } from 'react';
import Description from './components/Description/Description';
import Options from './components/Options/Options';
import Feedback from './components/Feedback/Feedback';
import Notification from './components/Notification/Notification.jsx';  

export default function App() {
  const [feedback, setFeedback] = useState(() => {
    // локал
    const storedFeedback = localStorage.getItem('feedback');
    return storedFeedback ? JSON.parse(storedFeedback) : { good: 0, neutral: 0, bad: 0 };
  });
  useEffect(() => {
    localStorage.setItem('feedback', JSON.stringify(feedback));
  }, [feedback]);



  const updateFeedback = feedbackType => {
    setFeedback(prev => ({
      ...prev,
      [feedbackType]: prev[feedbackType] + 1
    }));
   
  }
  const totalFeedback = feedback.good + feedback.neutral + feedback.bad;
  const positiveFeedback = totalFeedback
    ? Math.round((feedback.good / totalFeedback) * 100)
    : 0;
  
    const resetFeedback = () => {
      setFeedback({ good: 0, neutral: 0, bad: 0 });
    };
    

    return (
      <div>
        <Description />
        <Options updateFeedback={updateFeedback}
        resetFeedback={resetFeedback}
        totalFeedback={totalFeedback}/>
        {totalFeedback > 0 ? (
  <Feedback
    feedback={feedback}
    totalFeedback={totalFeedback}
    positiveFeedback={positiveFeedback}
  />
) : (
  <Notification message="No feedback yet" />
)}
      </div>
      
    );
}









