import { createContext, useContext, useState, ReactNode } from 'react';
import { User, AuthState } from '../types';
import { users } from '../data/mockData';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: false,
  });

  const login = async (email: string, password: string): Promise<boolean> => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = users.find(u => u.email === email);
        
        if (user) {
          setAuthState({
            user,
            isAuthenticated: true,
            isLoading: false,
          });
          localStorage.setItem('user', JSON.stringify(user));
          resolve(true);
        } else {
          setAuthState(prev => ({ ...prev, isLoading: false }));
          resolve(false);
        }
      }, 1000);
    });
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const existingUser = users.find(u => u.email === email);
        
        if (existingUser) {
          setAuthState(prev => ({ ...prev, isLoading: false }));
          resolve(false);
        } else {
          const newUser: User = {
            id: String(users.length + 1),
            name,
            email,
          };
          
          users.push(newUser);
          
          setAuthState({
            user: newUser,
            isAuthenticated: true,
            isLoading: false,
          });
          
          localStorage.setItem('user', JSON.stringify(newUser));
          resolve(true);
        }
      }, 1000);
    });
  };

  const logout = () => {
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};