import React from 'react';
import { Button as AntButton, ButtonProps as AntButtonProps } from 'antd';
import { cn } from '../../utils';

interface ButtonProps extends AntButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'link' | 'text' | 'default';
  size?: 'small' | 'middle' | 'large';
}

const Button: React.FC<ButtonProps> = ({ 
  className, 
  variant = 'default', 
  size = 'middle',
  children, 
  ...props 
}) => {
  const getButtonType = () => {
    switch (variant) {
      case 'primary': return 'primary';
      case 'secondary': return 'default';
      case 'ghost': return 'ghost';
      case 'link': return 'link';
      case 'text': return 'text';
      default: return 'default';
    }
  };

  return (
    <AntButton
      type={getButtonType()}
      size={size}
      className={cn(
        'transition-all duration-200 font-medium',
        {
          'bg-gradient-to-r from-blue-500 to-blue-600 border-blue-500 hover:from-blue-600 hover:to-blue-700': variant === 'primary',
          'border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-500': variant === 'secondary',
        },
        className
      )}
      {...props}
    >
      {children}
    </AntButton>
  );
};

export default Button;
