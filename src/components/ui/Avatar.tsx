import React from 'react';
import { Avatar as AntAvatar, AvatarProps as AntAvatarProps } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { cn } from '../../utils';

interface AvatarProps extends AntAvatarProps {
  variant?: 'circle' | 'square' | 'rounded';
  avatarSize?: 'small' | 'default' | 'large' | number;
  name?: string;
}

const Avatar: React.FC<AvatarProps> = ({ 
  className, 
  variant = 'circle',
  avatarSize = 'default',
  name,
  src,
  icon,
  children,
  ...props 
}) => {
  const getAvatarShape = () => {
    switch (variant) {
      case 'square': return 'square';
      case 'rounded': return 'square';
      default: return 'circle';
    }
  };

  const getAvatarStyles = () => {
    const baseStyles = 'transition-all duration-200 flex items-center justify-center';
    
    switch (variant) {
      case 'rounded':
        return cn(baseStyles, 'rounded-lg');
      case 'square':
        return cn(baseStyles, 'rounded-none');
      default:
        return cn(baseStyles, '');
    }
  };

  // Generate initials from name
  const getInitials = (fullName: string) => {
    return fullName
      .split(' ')
      .map(name => name.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Determine what to display
  const getAvatarContent = () => {
    if (src) return null; // Image will be used
    if (children) return children;
    if (name) return getInitials(name);
    if (icon) return icon;
    return <UserOutlined />;
  };

  return (
    <AntAvatar
      shape={getAvatarShape()}
      size={avatarSize}
      src={src}
      className={cn(getAvatarStyles(), className)}
      {...props}
    >
      {getAvatarContent()}
    </AntAvatar>
  );
};

// Avatar Group component
const AvatarGroup: React.FC<React.ComponentProps<typeof AntAvatar.Group> & {
  variant?: 'circle' | 'square' | 'rounded';
}> = ({ 
  className, 
  variant = 'circle',
  children,
  ...props 
}) => {
  const getGroupStyles = () => {
    const baseStyles = 'transition-all duration-200';
    
    switch (variant) {
      case 'rounded':
        return cn(baseStyles, '[&_.ant-avatar]:rounded-lg');
      case 'square':
        return cn(baseStyles, '[&_.ant-avatar]:rounded-none');
      default:
        return cn(baseStyles, '');
    }
  };

  return (
    <AntAvatar.Group
      className={cn(getGroupStyles(), className)}
      {...props}
    >
      {children}
    </AntAvatar.Group>
  );
};

Avatar.Group = AvatarGroup;

export default Avatar;
