import React, { useState } from 'react';
import { useFeedback } from '../context/FeedbackContext';
import { useAuth } from '../context/AuthContext';
import { busLines, feedbackTypes } from '../data/mockData';
import Card from '../components/ui/Card';
import Select from '../components/ui/Select';
import Button from '../components/ui/Button';
import FeedbackCard from '../components/feedback/FeedbackCard';
import { Filter, Inbox, RefreshCw, UserCircle } from 'lucide-react';

const FeedbackListPage: React.FC = () => {
  const { feedbacks, userFeedbacks } = useFeedback();
  const { isAuthenticated } = useAuth();
  
  const [filters, setFilters] = useState({
    busLineId: '',
    feedbackTypeId: '',
    showOnlyMine: false,
  });
  
  const [showFilters, setShowFilters] = useState(false);
  
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const toggleMyFeedbacks = () => {
    setFilters(prev => ({
      ...prev,
      showOnlyMine: !prev.showOnlyMine,
    }));
  };
  
  const resetFilters = () => {
    setFilters({
      busLineId: '',
      feedbackTypeId: '',
      showOnlyMine: false,
    });
  };
  
  const toggleFilters = () => {
    setShowFilters(prev => !prev);
  };
  
  // Apply filters
  const filteredFeedbacks = feedbacks.filter(feedback => {
    // Filter by bus line
    if (filters.busLineId && feedback.busLineId !== filters.busLineId) {
      return false;
    }
    
    // Filter by feedback type
    if (filters.feedbackTypeId && feedback.feedbackTypeId !== filters.feedbackTypeId) {
      return false;
    }
    
    // Filter by user's feedbacks
    if (filters.showOnlyMine && feedback.userId !== (isAuthenticated ? userFeedbacks[0]?.userId : null)) {
      return false;
    }
    
    return true;
  });
  
  const busLineOptions = [
    { value: '', label: 'Todas as linhas' },
    ...busLines.map(line => ({
      value: line.id,
      label: `${line.number} - ${line.name}`,
    })),
  ];
  
  const feedbackTypeOptions = [
    { value: '', label: 'Todos os problemas' },
    ...feedbackTypes.map(type => ({
      value: type.id,
      label: type.name,
    })),
  ];
  
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Feedbacks
            </h2>
            <p className="mt-2 text-gray-600">
              Confira os feedbacks enviados pelos usuários
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Filter size={16} />}
              onClick={toggleFilters}
              className={showFilters ? 'bg-blue-50 border-blue-300 text-blue-700' : ''}
            >
              Filtros
            </Button>
            
            {isAuthenticated && (
              <Button
                variant={filters.showOnlyMine ? 'primary' : 'outline'}
                size="sm"
                leftIcon={<UserCircle size={16} />}
                onClick={toggleMyFeedbacks}
              >
                Meus Feedbacks
              </Button>
            )}
            
            {(filters.busLineId || filters.feedbackTypeId || filters.showOnlyMine) && (
              <Button
                variant="ghost"
                size="sm"
                leftIcon={<RefreshCw size={16} />}
                onClick={resetFilters}
              >
                Limpar
              </Button>
            )}
          </div>
        </div>
        
        {showFilters && (
          <Card className="mb-6 p-4 bg-gray-50 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                name="busLineId"
                label="Filtrar por linha"
                options={busLineOptions}
                value={filters.busLineId}
                onChange={handleFilterChange}
              />
              
              <Select
                name="feedbackTypeId"
                label="Filtrar por problema"
                options={feedbackTypeOptions}
                value={filters.feedbackTypeId}
                onChange={handleFilterChange}
              />
            </div>
          </Card>
        )}
        
        {filteredFeedbacks.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="flex flex-col items-center justify-center">
              <Inbox size={48} className="text-gray-400 mb-4" />
              <h3 className="text-xl font-medium text-gray-700 mb-2">
                Nenhum feedback encontrado
              </h3>
              <p className="text-gray-500 max-w-sm mx-auto">
                {filters.showOnlyMine
                  ? 'Você ainda não enviou nenhum feedback. Que tal compartilhar sua experiência?'
                  : 'Não encontramos feedbacks com os filtros selecionados. Tente outros filtros ou envie o primeiro feedback!'}
              </p>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredFeedbacks.map(feedback => (
              <FeedbackCard key={feedback.id} feedback={feedback} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackListPage;