import { BusLine, FeedbackType, Feedback, User } from '../types';
import { v4 as uuidv4 } from 'uuid';

export const feedbackTypes: FeedbackType[] = [
  {
    id: '1',
    name: 'Atraso',
    description: 'Ônibus com atraso no horário',
    icon: 'clock',
  },
  {
    id: '2',
    name: 'Superlotação',
    description: 'Ônibus com excesso de passageiros',
    icon: 'users',
  },
  {
    id: '3',
    name: 'Má conservação',
    description: 'Veículo em condições precárias',
    icon: 'wrench',
  },
  {
    id: '4',
    name: 'Problema com motorista',
    description: 'Conduta inadequada do motorista',
    icon: 'user',
  },
  {
    id: '5',
    name: 'Segurança',
    description: 'Problemas relacionados à segurança',
    icon: 'shield',
  },
  {
    id: '6',
    name: 'Outro',
    description: 'Outros problemas não listados',
    icon: 'more-horizontal',
  },
];

export const busLines: BusLine[] = [
  {
    id: '1',
    number: '101',
    name: 'Circular Olinda',
    route: 'Centro - Rio Doce',
  },
  {
    id: '2',
    number: '102',
    name: 'Ouro Preto',
    route: 'Ouro Preto - Centro',
  },
  {
    id: '3',
    number: '103',
    name: 'Jardim Brasil',
    route: 'Jardim Brasil - Centro',
  },
  {
    id: '4',
    number: '104',
    name: 'Peixinhos',
    route: 'Peixinhos - Centro',
  },
  {
    id: '5',
    number: '105',
    name: 'Casa Caiada',
    route: 'Casa Caiada - Centro',
  },
  {
    id: '6',
    number: '106',
    name: 'Aguazinha',
    route: 'Aguazinha - Centro',
  },
  {
    id: '7',
    number: '107',
    name: 'Alto da Nação',
    route: 'Alto da Nação - Centro',
  },
  {
    id: '8',
    number: '108',
    name: 'Bultrins',
    route: 'Bultrins - Centro',
  },
];

// Mock feedback data
export const mockFeedbacks: Feedback[] = [
  {
    id: uuidv4(),
    userId: '1',
    busLineId: '1',
    feedbackTypeId: '1',
    comment: 'Ônibus atrasou mais de 30 minutos hoje pela manhã.',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: uuidv4(),
    userId: '1',
    busLineId: '2',
    feedbackTypeId: '2',
    comment: 'Impossível entrar no ônibus na hora do rush. Precisamos de mais veículos.',
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: uuidv4(),
    userId: '1',
    busLineId: '3',
    feedbackTypeId: '3',
    comment: 'Bancos rasgados e ar-condicionado não funciona.',
    createdAt: new Date(Date.now() - 259200000).toISOString(),
  },
];

// Mock users
export const users: User[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao@exemplo.com',
  },
];

// Helper functions for mock data operations
export const addFeedback = (feedback: Omit<Feedback, 'id' | 'createdAt'>): Feedback => {
  const newFeedback: Feedback = {
    ...feedback,
    id: uuidv4(),
    createdAt: new Date().toISOString(),
  };
  
  return newFeedback;
};

export const getFeedbacksByUserId = (userId: string): Feedback[] => {
  return mockFeedbacks.filter(feedback => feedback.userId === userId);
};

export const getFeedbacksByBusLine = (busLineId: string): Feedback[] => {
  return mockFeedbacks.filter(feedback => feedback.busLineId === busLineId);
};

export const getFeedbacksByType = (typeId: string): Feedback[] => {
  return mockFeedbacks.filter(feedback => feedback.feedbackTypeId === typeId);
};