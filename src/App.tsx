import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { FeedbackProvider } from './context/FeedbackContext';

// Layout components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import FeedbackFormPage from './pages/FeedbackFormPage';
import FeedbackListPage from './pages/FeedbackListPage';

// Routes with authentication
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {

  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <FeedbackProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/feedback" element={
                  <ProtectedRoute>
                    <FeedbackFormPage />
                  </ProtectedRoute>
                } />
                <Route path="/feedbacks" element={<FeedbackListPage />} />
                
                
                <Route path="*" element={<Navigate to="/\" replace />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </FeedbackProvider>
    </AuthProvider>
  );
}

export default App;