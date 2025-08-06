import React from 'react';
import { Card as AntCard, CardProps as AntCardProps } from 'antd';
import { cn } from '../../utils';

interface CardProps {
  variant?: 'default' | 'outlined' | 'elevated' | 'glass';
  padding?: 'none' | 'small' | 'medium' | 'large';
  className?: string;
  children?: React.ReactNode;
  [key: string]: any; // Allow other props to be passed
}

const Card: React.FC<CardProps> = ({ 
  className, 
  variant = 'default',
  padding = 'medium',
  children,
  ...props 
}) => {
  const getCardStyles = () => {
    const baseStyles = 'transition-all duration-300';
    
    switch (variant) {
      case 'outlined':
        return cn(baseStyles, 'border-2 shadow-none hover:shadow-md');
      case 'elevated':
        return cn(baseStyles, 'shadow-lg hover:shadow-xl border-0');
      case 'glass':
        return cn(baseStyles, 'backdrop-blur-md bg-white/90 border border-white/20 shadow-xl');
      default:
        return cn(baseStyles, 'shadow-sm hover:shadow-md border border-gray-200');
    }
  };

  const getPadding = () => {
    switch (padding) {
      case 'none': return { padding: 0 };
      case 'small': return { padding: 12 };
      case 'large': return { padding: 32 };
      default: return { padding: 24 };
    }
  };

  return (
    <AntCard
      className={cn(getCardStyles(), className)}
      bodyStyle={getPadding()}
      {...props}
    >
      {children}
    </AntCard>
  );
};

export default Card;
