import React from 'react';
import { FeedbackType } from '../../types';
import { Clock, Users, Wrench, User, Shield, MoreHorizontal } from 'lucide-react';

interface FeedbackTypeCardProps {
  feedbackType: FeedbackType;
  isSelected: boolean;
  onClick: () => void;
}

const FeedbackTypeCard: React.FC<FeedbackTypeCardProps> = ({ 
  feedbackType, 
  isSelected,
  onClick 
}) => {
  const getIcon = () => {
    switch (feedbackType.icon) {
      case 'clock':
        return <Clock size={24} />;
      case 'users':
        return <Users size={24} />;
      case 'wrench':
        return <Wrench size={24} />;
      case 'user':
        return <User size={24} />;
      case 'shield':
        return <Shield size={24} />;
      case 'more-horizontal':
      default:
        return <MoreHorizontal size={24} />;
    }
  };
  
  return (
    <div 
      className={`
        cursor-pointer rounded-lg border p-4 transition-all duration-200
        ${isSelected 
          ? 'border-blue-500 bg-blue-50 shadow-md' 
          : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm'
        }
      `}
      onClick={onClick}
    >
      <div className="flex flex-col items-center text-center">
        <div className={`
          mb-3 rounded-full p-3
          ${isSelected ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}
        `}>
          {getIcon()}
        </div>
        <h3 className="text-md font-medium text-gray-800">{feedbackType.name}</h3>
        <p className="mt-1 text-xs text-gray-500">{feedbackType.description}</p>
      </div>
    </div>
  );
};

export default FeedbackTypeCard;