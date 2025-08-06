import React from 'react';
import { Input as AntInput, InputProps as AntInputProps } from 'antd';
import { cn } from '../../utils';

interface InputProps extends AntInputProps {
  variant?: 'default' | 'filled' | 'borderless';
  inputSize?: 'small' | 'middle' | 'large';
}

const Input: React.FC<InputProps> = ({ 
  className, 
  variant = 'default',
  inputSize = 'middle',
  ...props 
}) => {
  const getInputStyles = () => {
    const baseStyles = 'transition-all duration-200';
    
    switch (variant) {
      case 'filled':
        return cn(baseStyles, 'bg-gray-50 border-gray-200 focus:bg-white');
      case 'borderless':
        return cn(baseStyles, 'border-0 shadow-none bg-transparent');
      default:
        return cn(baseStyles, 'border-gray-300 focus:border-blue-500');
    }
  };

  return (
    <AntInput
      size={inputSize}
      className={cn(getInputStyles(), className)}
      {...props}
    />
  );
};

// Export Password component
const Password: React.FC<InputProps> = ({ className, variant = 'default', inputSize = 'middle', ...props }) => {
  const getInputStyles = () => {
    const baseStyles = 'transition-all duration-200';
    
    switch (variant) {
      case 'filled':
        return cn(baseStyles, 'bg-gray-50 border-gray-200 focus:bg-white');
      case 'borderless':
        return cn(baseStyles, 'border-0 shadow-none bg-transparent');
      default:
        return cn(baseStyles, 'border-gray-300 focus:border-blue-500');
    }
  };

  return (
    <AntInput.Password
      size={inputSize}
      className={cn(getInputStyles(), className)}
      {...props}
    />
  );
};

// Export TextArea component
const TextArea: React.FC<React.ComponentProps<typeof AntInput.TextArea> & { variant?: 'default' | 'filled' | 'borderless' }> = ({ 
  className, 
  variant = 'default',
  ...props 
}) => {
  const getInputStyles = () => {
    const baseStyles = 'transition-all duration-200';
    
    switch (variant) {
      case 'filled':
        return cn(baseStyles, 'bg-gray-50 border-gray-200 focus:bg-white');
      case 'borderless':
        return cn(baseStyles, 'border-0 shadow-none bg-transparent');
      default:
        return cn(baseStyles, 'border-gray-300 focus:border-blue-500');
    }
  };

  return (
    <AntInput.TextArea
      className={cn(getInputStyles(), className)}
      {...props}
    />
  );
};

// Export Search component
const Search: React.FC<React.ComponentProps<typeof AntInput.Search> & { variant?: 'default' | 'filled' | 'borderless' }> = ({ 
  className, 
  variant = 'default',
  ...props 
}) => {
  const getInputStyles = () => {
    const baseStyles = 'transition-all duration-200';
    
    switch (variant) {
      case 'filled':
        return cn(baseStyles, 'bg-gray-50 border-gray-200 focus:bg-white');
      case 'borderless':
        return cn(baseStyles, 'border-0 shadow-none bg-transparent');
      default:
        return cn(baseStyles, 'border-gray-300 focus:border-blue-500');
    }
  };

  return (
    <AntInput.Search
      className={cn(getInputStyles(), className)}
      {...props}
    />
  );
};

Input.Password = Password;
Input.TextArea = TextArea;
Input.Search = Search;

export default Input;
