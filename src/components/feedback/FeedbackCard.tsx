import React from 'react';
import { Feedback, BusLine, FeedbackType } from '../../types';
import { Clock, MapPin, Bus } from 'lucide-react';
import { formatDate } from '../../utils/formatDate';
import { busLines, feedbackTypes } from '../../data/mockData';

interface FeedbackCardProps {
  feedback: Feedback;
}

const FeedbackCard: React.FC<FeedbackCardProps> = ({ feedback }) => {
  const busLine = busLines.find(line => line.id === feedback.busLineId) as BusLine;
  const feedbackType = feedbackTypes.find(type => type.id === feedback.feedbackTypeId) as FeedbackType;
  
  const getTypeIcon = () => {
    switch (feedbackType.icon) {
      case 'clock':
        return <Clock size={16} className="text-orange-500" />;
      case 'users':
        return <Users size={16} className="text-purple-500" />;
      case 'wrench':
        return <Wrench size={16} className="text-red-500" />;
      case 'user':
        return <User size={16} className="text-blue-500" />;
      case 'shield':
        return <Shield size={16} className="text-yellow-500" />;
      default:
        return <MoreHorizontal size={16} className="text-gray-500" />;
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-100 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Bus size={18} className="text-blue-600" />
          <div>
            <span className="font-medium text-gray-800">{busLine.number}</span>
            <span className="text-gray-500 text-sm ml-2">{busLine.name}</span>
          </div>
        </div>
        <div className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded-full text-xs">
          {getTypeIcon()}
          <span className="text-gray-700">{feedbackType.name}</span>
        </div>
      </div>
      
      <p className="text-gray-700 text-sm mb-3">{feedback.comment}</p>
      
      <div className="flex items-center justify-between text-xs text-gray-500 mt-4 pt-3 border-t border-gray-100">
        <div className="flex items-center space-x-1">
          <Clock size={14} />
          <span>{formatDate(feedback.createdAt)}</span>
        </div>
        
        {feedback.location && (
          <div className="flex items-center space-x-1">
            <MapPin size={14} />
            <span>Localização registrada</span>
          </div>
        )}
      </div>
    </div>
  );
};

// Import icons used in getTypeIcon
import { Users, Wrench, User, Shield, MoreHorizontal } from 'lucide-react';

export default FeedbackCard;