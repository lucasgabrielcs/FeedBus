export interface User {
  id: string;
  name: string;
  email: string;
}

export interface FeedbackType {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface BusLine {
  id: string;
  number: string;
  name: string;
  route: string;
}

export interface Feedback {
  id: string;
  userId: string;
  busLineId: string;
  feedbackTypeId: string;
  comment: string;
  createdAt: string;
  location?: {
    latitude: number;
    longitude: number;
  };
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}