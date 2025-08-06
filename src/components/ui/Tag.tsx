import React from 'react';
import { Tag as AntTag, TagProps as AntTagProps } from 'antd';
import { cn } from '../../utils';

interface TagProps extends AntTagProps {
  variant?: 'default' | 'outline' | 'solid' | 'gradient';
  tagSize?: 'small' | 'middle' | 'large';
}

const Tag: React.FC<TagProps> = ({ 
  className, 
  variant = 'default',
  tagSize = 'middle',
  color,
  children,
  ...props 
}) => {
  const getTagStyles = () => {
    const baseStyles = 'transition-all duration-200 border-0';
    
    const sizeStyles = {
      small: 'text-xs px-2 py-0.5',
      middle: 'text-sm px-3 py-1',
      large: 'text-base px-4 py-1.5',
    };

    switch (variant) {
      case 'outline':
        return cn(baseStyles, sizeStyles[tagSize], 'bg-transparent border border-current');
      case 'solid':
        return cn(baseStyles, sizeStyles[tagSize], 'font-medium');
      case 'gradient':
        return cn(baseStyles, sizeStyles[tagSize], 'bg-gradient-to-r from-blue-500 to-purple-500 text-white');
      default:
        return cn(baseStyles, sizeStyles[tagSize]);
    }
  };

  // Color mapping for better visual consistency
  const getStatusColor = (status?: string) => {
    if (color) return color;
    
    switch (status?.toLowerCase()) {
      case 'active': return 'green';
      case 'completed': return 'blue';
      case 'delayed': return 'red';
      case 'pending': return 'orange';
      case 'todo': return 'gold';
      case 'inprogress': return 'blue';
      case 'done': return 'green';
      default: return 'default';
    }
  };

  return (
    <AntTag
      color={getStatusColor(children?.toString())}
      className={cn(getTagStyles(), className)}
      {...props}
    >
      {children}
    </AntTag>
  );
};

export default Tag;
