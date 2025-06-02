import React from 'react';
import { Bus, UserCircle, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <header className="bg-blue-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Bus size={28} />
            <div>
              <h1 className="text-xl font-bold">FeedBus</h1>
              <p className="text-xs text-blue-200">Feedback do Transporte Público</p>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={`text-sm font-medium hover:text-blue-200 ${
                isActive('/') ? 'text-white border-b-2 border-white pb-1' : 'text-blue-100'
              }`}
            >
              Início
            </Link>
            <Link 
              to="/feedback" 
              className={`text-sm font-medium hover:text-blue-200 ${
                isActive('/feedback') ? 'text-white border-b-2 border-white pb-1' : 'text-blue-100'
              }`}
            >
              Enviar Feedback
            </Link>
            <Link 
              to="/feedbacks" 
              className={`text-sm font-medium hover:text-blue-200 ${
                isActive('/feedbacks') ? 'text-white border-b-2 border-white pb-1' : 'text-blue-100'
              }`}
            >
              Ver Feedbacks
            </Link>
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link to="/profile" className="flex items-center space-x-2 text-blue-100 hover:text-white">
                  <UserCircle size={20} />
                  <span className="text-sm">{user?.name}</span>
                </Link>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-blue-100 hover:text-white hover:bg-blue-700"
                  onClick={logout}
                  leftIcon={<LogOut size={16} />}
                >
                  Sair
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="text-blue-100 hover:text-white hover:bg-blue-700">
                    Entrar
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-500">
                    Cadastrar
                  </Button>
                </Link>
              </div>
            )}
          </nav>
          
          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 space-y-3">
            <Link 
              to="/"
              className={`block py-2 px-4 rounded ${
                isActive('/') ? 'bg-blue-700 text-white' : 'text-blue-100'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Início
            </Link>
            <Link 
              to="/feedback"
              className={`block py-2 px-4 rounded ${
                isActive('/feedback') ? 'bg-blue-700 text-white' : 'text-blue-100'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Enviar Feedback
            </Link>
            <Link 
              to="/feedbacks"
              className={`block py-2 px-4 rounded ${
                isActive('/feedbacks') ? 'bg-blue-700 text-white' : 'text-blue-100'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Ver Feedbacks
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link 
                  to="/profile"
                  className={`block py-2 px-4 rounded ${
                    isActive('/profile') ? 'bg-blue-700 text-white' : 'text-blue-100'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center space-x-2">
                    <UserCircle size={20} />
                    <span>{user?.name}</span>
                  </div>
                </Link>
                <button 
                  className="w-full text-left block py-2 px-4 rounded text-blue-100"
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                >
                  <div className="flex items-center space-x-2">
                    <LogOut size={20} />
                    <span>Sair</span>
                  </div>
                </button>
              </>
            ) : (
              <div className="space-y-2 pt-2 border-t border-blue-700">
                <Link 
                  to="/login"
                  className="block w-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button variant="ghost" fullWidth className="justify-start text-blue-100 hover:text-white hover:bg-blue-700">
                    Entrar
                  </Button>
                </Link>
                <Link 
                  to="/register"
                  className="block w-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button fullWidth className="justify-start bg-blue-600 hover:bg-blue-500">
                    Cadastrar
                  </Button>
                </Link>
              </div>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;