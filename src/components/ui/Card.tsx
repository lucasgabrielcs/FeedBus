import React, { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  footer?: React.ReactNode;
  isHoverable?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  footer,
  isHoverable = false,
  className = '',
  ...props
}) => {
  const hoverClass = isHoverable ? 'transition-shadow hover:shadow-lg' : '';
  
  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden ${hoverClass} ${className}`}
      {...props}
    >
      {(title || subtitle) && (
        <div className="p-4 border-b">
          {title && <h3 className="text-lg font-semibold text-gray-800">{title}</h3>}
          {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
        </div>
      )}
      <div className="p-4">
        {children}
      </div>
      {footer && (
        <div className="p-4 bg-gray-50 border-t">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;