import React from 'react';
import { Select as AntSelect, SelectProps as AntSelectProps } from 'antd';
import { cn } from '../../utils';

interface SelectProps extends AntSelectProps {
  variant?: 'default' | 'filled' | 'borderless';
  selectSize?: 'small' | 'middle' | 'large';
}

const Select: React.FC<SelectProps> = ({ 
  className, 
  variant = 'default',
  selectSize = 'middle',
  ...props 
}) => {
  const getSelectStyles = () => {
    const baseStyles = 'transition-all duration-200';
    
    switch (variant) {
      case 'filled':
        return cn(baseStyles, '[&_.ant-select-selector]:bg-gray-50 [&_.ant-select-selector]:border-gray-200');
      case 'borderless':
        return cn(baseStyles, '[&_.ant-select-selector]:border-0 [&_.ant-select-selector]:shadow-none');
      default:
        return cn(baseStyles, '[&_.ant-select-selector]:border-gray-300 [&_.ant-select-selector:hover]:border-blue-500');
    }
  };

  return (
    <AntSelect
      size={selectSize}
      className={cn(getSelectStyles(), className)}
      {...props}
    />
  );
};

// Export Option for convenience
const { Option } = AntSelect;
Select.Option = Option;

export default Select;
