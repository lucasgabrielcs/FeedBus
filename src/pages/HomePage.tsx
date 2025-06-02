import React from 'react';
import { Bus, Star, MessageSquare, TrendingUp, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useFeedback } from '../context/FeedbackContext';

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { feedbacks } = useFeedback();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-blue-800 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Ajude a melhorar o transporte público
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8">
              Sua opinião é fundamental para construirmos um sistema de transporte 
              mais eficiente e de qualidade para todos.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/feedback">
                <Button 
                  size="lg" 
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                  rightIcon={<ArrowRight size={18} />}
                >
                  Enviar Feedback
                </Button>
              </Link>
              <Link to="/feedbacks">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white text-white hover:bg-white hover:text-blue-800"
                >
                  Ver Feedbacks
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Como funciona o FeedBus
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6 transform transition-transform hover:scale-105">
              <div className="bg-blue-100 text-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Bus size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Selecione a Linha</h3>
              <p className="text-gray-600">
                Escolha a linha de ônibus sobre a qual deseja enviar feedback.
              </p>
            </Card>
            
            <Card className="text-center p-6 transform transition-transform hover:scale-105">
              <div className="bg-orange-100 text-orange-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Star size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Identifique o Problema</h3>
              <p className="text-gray-600">
                Indique o tipo de problema que você enfrentou durante sua viagem.
              </p>
            </Card>
            
            <Card className="text-center p-6 transform transition-transform hover:scale-105">
              <div className="bg-green-100 text-green-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <MessageSquare size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Envie seu Comentário</h3>
              <p className="text-gray-600">
                Compartilhe detalhes sobre sua experiência para ajudar a melhorar o serviço.
              </p>
            </Card>
          </div>
        </div>
      </section>
      
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Impacto do seu feedback
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{feedbacks.length}</div>
              <p className="text-gray-600">Feedbacks Enviados</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-3xl font-bold text-orange-500 mb-2">8</div>
              <p className="text-gray-600">Linhas Monitoradas</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-3xl font-bold text-green-500 mb-2">15</div>
              <p className="text-gray-600">Melhorias Implementadas</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-3xl font-bold text-purple-500 mb-2">92%</div>
              <p className="text-gray-600">Satisfação dos Usuários</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Faça parte da transformação do transporte público
            </h2>
            <p className="text-gray-600 mb-8">
              Sua participação é essencial para melhorarmos o sistema de transporte.
              Compartilhe suas experiências e ajude a construir um serviço melhor para todos.
            </p>
            
            {isAuthenticated ? (
              <Link to="/feedback">
                <Button 
                  size="lg" 
                  className="bg-blue-800 hover:bg-blue-700"
                  rightIcon={<TrendingUp size={18} />}
                >
                  Enviar Novo Feedback
                </Button>
              </Link>
            ) : (
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/register">
                  <Button 
                    size="lg" 
                    className="bg-blue-800 hover:bg-blue-700"
                  >
                    Cadastre-se Agora
                  </Button>
                </Link>
                <Link to="/login">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="border-blue-800 text-blue-800 hover:bg-blue-50"
                  >
                    Já tenho uma conta
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;