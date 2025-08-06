import React from 'react';
import { Form as AntForm, FormProps as AntFormProps, FormItemProps } from 'antd';
import { cn } from '../../utils';

interface FormProps extends AntFormProps {
  variant?: 'default' | 'inline' | 'vertical';
}

const Form: React.FC<FormProps> = ({ 
  className, 
  variant = 'default',
  layout,
  ...props 
}) => {
  const getFormLayout = () => {
    if (layout) return layout;
    
    switch (variant) {
      case 'inline': return 'inline';
      case 'vertical': return 'vertical';
      default: return 'vertical';
    }
  };

  return (
    <AntForm
      layout={getFormLayout()}
      className={cn('', className)}
      {...props}
    />
  );
};

// Form.Item component
interface FormItemExtendedProps extends FormItemProps {
  variant?: 'default' | 'compact';
}

const FormItem: React.FC<FormItemExtendedProps> = ({ 
  className, 
  variant = 'default',
  ...props 
}) => {
  const getFormItemStyles = () => {
    switch (variant) {
      case 'compact':
        return 'mb-3';
      default:
        return 'mb-4';
    }
  };

  return (
    <AntForm.Item
      className={cn(getFormItemStyles(), className)}
      {...props}
    />
  );
};

// Form.useForm hook
const useForm = AntForm.useForm;

// Assign components and hooks to Form
Form.Item = FormItem;
Form.useForm = useForm;
Form.List = AntForm.List;
Form.ErrorList = AntForm.ErrorList;
Form.Provider = AntForm.Provider;

export default Form;
