import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Feedback } from '../types';
import { addFeedback as addMockFeedback, mockFeedbacks } from '../data/mockData';
import { useAuth } from './AuthContext';

interface FeedbackContextType {
  feedbacks: Feedback[];
  userFeedbacks: Feedback[];
  addFeedback: (feedback: Omit<Feedback, 'id' | 'createdAt'>) => Promise<Feedback>;
  isLoading: boolean;
}

const FeedbackContext = createContext<FeedbackContextType | undefined>(undefined);

export const FeedbackProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load mock feedbacks
    setFeedbacks(mockFeedbacks);
  }, []);

  const userFeedbacks = user 
    ? feedbacks.filter(feedback => feedback.userId === user.id)
    : [];

  const addFeedback = async (feedbackData: Omit<Feedback, 'id' | 'createdAt'>): Promise<Feedback> => {
    setIsLoading(true);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const newFeedback = addMockFeedback(feedbackData);
        setFeedbacks(prev => [newFeedback, ...prev]);
        setIsLoading(false);
        resolve(newFeedback);
      }, 1000);
    });
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedbacks,
        userFeedbacks,
        addFeedback,
        isLoading,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export const useFeedback = () => {
  const context = useContext(FeedbackContext);
  if (context === undefined) {
    throw new Error('useFeedback must be used within a FeedbackProvider');
  }
  return context;
};