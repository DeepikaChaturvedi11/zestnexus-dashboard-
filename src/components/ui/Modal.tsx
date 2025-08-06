import React from 'react';
import { Modal as AntModal, ModalProps as AntModalProps } from 'antd';
import { cn } from '../../utils';

interface ModalProps extends AntModalProps {
  variant?: 'default' | 'centered' | 'fullscreen';
}

const Modal: React.FC<ModalProps> = ({ 
  className, 
  variant = 'default',
  children,
  ...props 
}) => {
  const getModalConfig = () => {
    switch (variant) {
      case 'centered':
        return {
          centered: true,
          className: cn('text-center', className),
        };
      case 'fullscreen':
        return {
          width: '100vw',
          style: { top: 0, paddingBottom: 0, maxWidth: 'none' },
          bodyStyle: { height: 'calc(100vh - 110px)', padding: '24px' },
          className: cn('fullscreen-modal', className),
        };
      default:
        return {
          className: cn('', className),
        };
    }
  };

  const modalConfig = getModalConfig();

  return (
    <AntModal
      {...modalConfig}
      {...props}
    >
      {children}
    </AntModal>
  );
};

export default Modal;
