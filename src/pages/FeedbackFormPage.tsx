import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useFeedback } from '../context/FeedbackContext';
import { busLines, feedbackTypes } from '../data/mockData';
import Button from '../components/ui/Button';
import Select from '../components/ui/Select';
import TextArea from '../components/ui/TextArea';
import Card from '../components/ui/Card';
import FeedbackTypeCard from '../components/feedback/FeedbackTypeCard';
import { MapPin, Send, AlertTriangle } from 'lucide-react';

const FeedbackFormPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { addFeedback, isLoading } = useFeedback();
  
  const [formData, setFormData] = useState({
    busLineId: '',
    feedbackTypeId: '',
    comment: '',
    useLocation: false,
    location: null as { latitude: number; longitude: number } | null,
  });
  
  const [errors, setErrors] = useState({
    busLineId: '',
    feedbackTypeId: '',
    comment: '',
    general: '',
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate('/login', { state: { from: '/feedback' } });
    }
  }, [isAuthenticated, isLoading, navigate]);
  
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };
  
  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      comment: e.target.value,
    }));
    
    if (errors.comment) {
      setErrors(prev => ({
        ...prev,
        comment: '',
      }));
    }
  };
  
  const handleFeedbackTypeSelect = (id: string) => {
    setFormData(prev => ({
      ...prev,
      feedbackTypeId: id,
    }));
    
    if (errors.feedbackTypeId) {
      setErrors(prev => ({
        ...prev,
        feedbackTypeId: '',
      }));
    }
  };
  
  const handleLocationToggle = () => {
    setFormData(prev => ({
      ...prev,
      useLocation: !prev.useLocation,
    }));
    
    if (formData.useLocation === false) {
      // Get current location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setFormData(prev => ({
              ...prev,
              location: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              },
            }));
          },
          (error) => {
            console.error('Error getting location:', error);
          }
        );
      }
    } else {
      // Clear location
      setFormData(prev => ({
        ...prev,
        location: null,
      }));
    }
  };
  
  const validate = () => {
    let isValid = true;
    const newErrors = {
      busLineId: '',
      feedbackTypeId: '',
      comment: '',
      general: '',
    };
    
    if (!formData.busLineId) {
      newErrors.busLineId = 'Selecione uma linha de ônibus';
      isValid = false;
    }
    
    if (!formData.feedbackTypeId) {
      newErrors.feedbackTypeId = 'Selecione um tipo de problema';
      isValid = false;
    }
    
    if (!formData.comment) {
      newErrors.comment = 'Escreva um comentário';
      isValid = false;
    } else if (formData.comment.length < 10) {
      newErrors.comment = 'O comentário deve ter pelo menos 10 caracteres';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    try {
      if (!user) return;
      
      await addFeedback({
        userId: user.id,
        busLineId: formData.busLineId,
        feedbackTypeId: formData.feedbackTypeId,
        comment: formData.comment,
        location: formData.location,
      });
      
      setIsSubmitted(true);
      
      // Reset form
      setFormData({
        busLineId: '',
        feedbackTypeId: '',
        comment: '',
        useLocation: false,
        location: null,
      });
      
      // Redirect to feedbacks page after a delay
      setTimeout(() => {
        navigate('/feedbacks');
      }, 3000);
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        general: 'Erro ao enviar feedback. Tente novamente.',
      }));
    }
  };
  
  if (!isAuthenticated) {
    return null; // Will redirect to login
  }
  
  const busLineOptions = busLines.map(line => ({
    value: line.id,
    label: `${line.number} - ${line.name} (${line.route})`,
  }));
  
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">
            Envie seu Feedback
          </h2>
          <p className="mt-2 text-gray-600">
            Compartilhe sua experiência e ajude a melhorar o transporte público de Olinda
          </p>
        </div>
        
        {isSubmitted ? (
          <Card className="bg-green-50 border-green-100 p-8 text-center">
            <div className="flex flex-col items-center justify-center">
              <div className="rounded-full bg-green-100 p-3 mb-4">
                <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-2">
                Feedback enviado com sucesso!
              </h3>
              <p className="text-green-700 mb-6">
                Obrigado por contribuir para a melhoria do transporte público de Olinda.
              </p>
              <p className="text-sm text-green-600">
                Você será redirecionado para a página de feedbacks em instantes...
              </p>
            </div>
          </Card>
        ) : (
          <Card className="p-6 md:p-8">
            {errors.general && (
              <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-md flex items-center">
                <AlertTriangle size={20} className="mr-2" />
                {errors.general}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  1. Selecione a linha de ônibus
                </h3>
                <Select
                  name="busLineId"
                  label="Linha de ônibus"
                  options={busLineOptions}
                  value={formData.busLineId}
                  onChange={handleSelectChange}
                  error={errors.busLineId}
                  fullWidth
                />
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  2. Qual o problema?
                </h3>
                
                {errors.feedbackTypeId && (
                  <p className="text-sm text-red-600 mb-2">{errors.feedbackTypeId}</p>
                )}
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {feedbackTypes.map((type) => (
                    <FeedbackTypeCard
                      key={type.id}
                      feedbackType={type}
                      isSelected={formData.feedbackTypeId === type.id}
                      onClick={() => handleFeedbackTypeSelect(type.id)}
                    />
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  3. Descreva o problema
                </h3>
                <TextArea
                  name="comment"
                  label="Comentário"
                  placeholder="Descreva o problema que você enfrentou..."
                  value={formData.comment}
                  onChange={handleTextAreaChange}
                  error={errors.comment}
                  rows={4}
                  maxLength={500}
                  charCount
                  fullWidth
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="useLocation"
                  checked={formData.useLocation}
                  onChange={handleLocationToggle}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="useLocation" className="text-sm text-gray-700 flex items-center">
                  <MapPin size={16} className="mr-1 text-blue-500" />
                  Incluir minha localização atual
                </label>
              </div>
              
              <div className="flex justify-end pt-4">
                <Button
                  type="submit"
                  size="lg"
                  isLoading={isLoading}
                  leftIcon={<Send size={18} />}
                >
                  Enviar Feedback
                </Button>
              </div>
            </form>
          </Card>
        )}
      </div>
    </div>
  );
};

export default FeedbackFormPage;