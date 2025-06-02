import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { Mail, Lock, User, UserPlus } from 'lucide-react';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register, isLoading } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    general: '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };
  
  const validate = () => {
    let isValid = true;
    const newErrors = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      general: '',
    };
    
    if (!formData.name) {
      newErrors.name = 'Nome é obrigatório';
      isValid = false;
    }
    
    if (!formData.email) {
      newErrors.email = 'Email é obrigatório';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
      isValid = false;
    }
    
    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'A senha deve ter pelo menos 6 caracteres';
      isValid = false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    try {
      const success = await register(formData.name, formData.email, formData.password);
      
      if (success) {
        navigate('/feedback');
      } else {
        setErrors(prev => ({
          ...prev,
          general: 'Este email já está em uso',
        }));
      }
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        general: 'Erro ao criar conta. Tente novamente.',
      }));
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Crie sua conta
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Ou{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              entre com uma conta existente
            </Link>
          </p>
        </div>
        
        <Card className="mt-8 py-8 px-4 sm:px-10">
          {errors.general && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-md border border-red-200">
              {errors.general}
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <Input
                id="name"
                name="name"
                type="text"
                label="Nome completo"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                fullWidth
                leftIcon={<User size={18} className="text-gray-400" />}
              />
            </div>
            
            <div>
              <Input
                id="email"
                name="email"
                type="email"
                label="Email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                fullWidth
                leftIcon={<Mail size={18} className="text-gray-400" />}
              />
            </div>
            
            <div>
              <Input
                id="password"
                name="password"
                type="password"
                label="Senha"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                fullWidth
                leftIcon={<Lock size={18} className="text-gray-400" />}
              />
            </div>
            
            <div>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                label="Confirmar senha"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
                fullWidth
                leftIcon={<Lock size={18} className="text-gray-400" />}
              />
            </div>
            
            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                required
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                Eu concordo com os{' '}
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                  Termos de Serviço
                </a>{' '}
                e{' '}
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                  Política de Privacidade
                </a>
              </label>
            </div>
            
            <div>
              <Button
                type="submit"
                fullWidth
                isLoading={isLoading}
                leftIcon={<UserPlus size={18} />}
              >
                Criar conta
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;