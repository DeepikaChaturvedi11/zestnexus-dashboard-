// Export all UI components for easy importing
export { default as Button } from './Button';
export { default as Card } from './Card';
export { default as Input } from './Input';
export { default as Select } from './Select';
export { default as Modal } from './Modal';
export { default as Table } from './Table';
export { default as Form } from './Form';
export { default as Tag } from './Tag';
export { default as DatePicker } from './DatePicker';
export { default as Badge } from './Badge';
export { default as Avatar } from './Avatar';

// Re-export Ant Design components that don't need customization
export {
  Space,
  Row,
  Col,
  Divider,
  Typography,
  Layout,
  Menu,
  Dropdown,
  Tooltip,
  Popconfirm,
  message,
  notification,
  Spin,
  Alert,
  Progress,
  Steps,
  Breadcrumb,
  Pagination,
  BackTop,
  Anchor,
  Affix,
} from 'antd';

// Re-export icons
export * from '@ant-design/icons';
