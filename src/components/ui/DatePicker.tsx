// import React from 'react';
// import { DatePicker as AntDatePicker, DatePickerProps as AntDatePickerProps } from 'antd';
// import { cn } from '../../utils';

// interface DatePickerProps extends AntDatePickerProps {
//   variant?: 'default' | 'filled' | 'borderless';
//   pickerSize?: 'small' | 'middle' | 'large';
// }

// const DatePicker: React.FC<DatePickerProps> = ({ 
//   className, 
//   variant = 'default',
//   pickerSize = 'middle',
//   ...props 
// }) => {
//   const getDatePickerStyles = () => {
//     const baseStyles = 'transition-all duration-200';
    
//     switch (variant) {
//       case 'filled':
//         return cn(baseStyles, '[&_.ant-picker]:bg-gray-50 [&_.ant-picker]:border-gray-200');
//       case 'borderless':
//         return cn(baseStyles, '[&_.ant-picker]:border-0 [&_.ant-picker]:shadow-none');
//       default:
//         return cn(baseStyles, '[&_.ant-picker]:border-gray-300 [&_.ant-picker:hover]:border-blue-500');
//     }
//   };

//   return (
//     <AntDatePicker
//       size={pickerSize}
//       className={cn(getDatePickerStyles(), className)}
//       {...props}
//     />
//   );
// };

// // RangePicker component
// const RangePicker: React.FC<React.ComponentProps<typeof AntDatePicker.RangePicker> & { 
//   variant?: 'default' | 'filled' | 'borderless';
//   pickerSize?: 'small' | 'middle' | 'large';
// }> = ({ 
//   className, 
//   variant = 'default',
//   pickerSize = 'middle',
//   ...props 
// }) => {
//   const getDatePickerStyles = () => {
//     const baseStyles = 'transition-all duration-200';
    
//     switch (variant) {
//       case 'filled':
//         return cn(baseStyles, '[&_.ant-picker]:bg-gray-50 [&_.ant-picker]:border-gray-200');
//       case 'borderless':
//         return cn(baseStyles, '[&_.ant-picker]:border-0 [&_.ant-picker]:shadow-none');
//       default:
//         return cn(baseStyles, '[&_.ant-picker]:border-gray-300 [&_.ant-picker:hover]:border-blue-500');
//     }
//   };

//   return (
//     <AntDatePicker.RangePicker
//       size={pickerSize}
//       className={cn(getDatePickerStyles(), className)}
//       {...props}
//     />
//   );
// };

// DatePicker.RangePicker = RangePicker;

// export default DatePicker;



import React from 'react';
import {
  DatePicker as AntDatePicker,
  DatePickerProps as AntDatePickerProps,
} from 'antd';
import { cn } from '../../utils';

interface DatePickerProps extends AntDatePickerProps {
  variant?: 'outlined' | 'filled' | 'borderless' | 'underlined';
  pickerSize?: 'small' | 'middle' | 'large';
}

const DatePicker: React.FC<DatePickerProps> = ({
  className,
  variant = 'outlined', // use 'outlined' as default
  pickerSize = 'middle',
  ...props
}) => {
  const getDatePickerStyles = () => {
    const baseStyles = 'transition-all duration-200';
    switch (variant) {
      case 'filled':
        return cn(
          baseStyles,
          '[&_.ant-picker]:bg-gray-50 [&_.ant-picker]:border-gray-200'
        );
      case 'borderless':
        return cn(
          baseStyles,
          '[&_.ant-picker]:border-0 [&_.ant-picker]:shadow-none'
        );
      default:
        return cn(
          baseStyles,
          '[&_.ant-picker]:border-gray-300 [&_.ant-picker:hover]:border-blue-500'
        );
    }
  };

  return (
    <AntDatePicker
      size={pickerSize}
      className={cn(getDatePickerStyles(), className)}
      {...props}
    />
  );
};

// RangePicker component
const RangePicker: React.FC<
  React.ComponentProps<typeof AntDatePicker.RangePicker> & {
    variant?: 'outlined' | 'filled' | 'borderless' | 'underlined';
    pickerSize?: 'small' | 'middle' | 'large';
  }
> = ({ className, variant = 'outlined', pickerSize = 'middle', ...props }) => {
  const getDatePickerStyles = () => {
    const baseStyles = 'transition-all duration-200';
    switch (variant) {
      case 'filled':
        return cn(
          baseStyles,
          '[&_.ant-picker]:bg-gray-50 [&_.ant-picker]:border-gray-200'
        );
      case 'borderless':
        return cn(
          baseStyles,
          '[&_.ant-picker]:border-0 [&_.ant-picker]:shadow-none'
        );
      default:
        return cn(
          baseStyles,
          '[&_.ant-picker]:border-gray-300 [&_.ant-picker:hover]:border-blue-500'
        );
    }
  };

  return (
    <AntDatePicker.RangePicker
      size={pickerSize}
      className={cn(getDatePickerStyles(), className)}
      {...props}
    />
  );
};

// Extend the type of DatePicker to include RangePicker property
interface DatePickerComponent extends React.FC<DatePickerProps> {
  RangePicker: typeof RangePicker;
}

const ExtendedDatePicker = DatePicker as DatePickerComponent;
ExtendedDatePicker.RangePicker = RangePicker;

export default ExtendedDatePicker;
