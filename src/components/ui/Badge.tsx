import React from 'react';
import { Badge as AntBadge, BadgeProps as AntBadgeProps } from 'antd';
import { cn } from '../../utils';

interface BadgeProps extends AntBadgeProps {
  variant?: 'default' | 'dot' | 'processing' | 'success' | 'error' | 'warning';
  badgeSize?: 'small' | 'default';
}

const Badge: React.FC<BadgeProps> = ({ 
  className, 
  variant = 'default',
  badgeSize = 'default',
  status,
  ...props 
}) => {
  const getBadgeStatus = () => {
    if (status) return status;
    
    switch (variant) {
      case 'processing': return 'processing';
      case 'success': return 'success';
      case 'error': return 'error';
      case 'warning': return 'warning';
      default: return status;
    }
  };

  const getBadgeStyles = () => {
    const baseStyles = 'transition-all duration-200';
    
    switch (badgeSize) {
      case 'small':
        return cn(baseStyles, '[&_.ant-badge-count]:text-xs [&_.ant-badge-count]:min-w-4 [&_.ant-badge-count]:h-4');
      default:
        return cn(baseStyles, '');
    }
  };

  if (variant === 'dot') {
    return (
      <AntBadge
        dot
        status={getBadgeStatus()}
        className={cn(getBadgeStyles(), className)}
        {...props}
      />
    );
  }

  return (
    <AntBadge
      status={getBadgeStatus()}
      className={cn(getBadgeStyles(), className)}
      {...props}
    />
  );
};

export default Badge;
