import React from 'react';
import { Table as AntTable, TableProps as AntTableProps } from 'antd';
import { cn } from '../../utils';

interface TableProps<T = any> extends AntTableProps<T> {
  variant?: 'default' | 'bordered' | 'striped';
  tableSize?: 'small' | 'middle' | 'large';
}

const Table = <T extends Record<string, any>>({ 
  className, 
  variant = 'default',
  tableSize = 'middle',
  ...props 
}: TableProps<T>) => {
  const getTableStyles = () => {
    const baseStyles = 'transition-all duration-200';
    
    switch (variant) {
      case 'bordered':
        return cn(baseStyles, '[&_.ant-table-tbody>tr>td]:border-r [&_.ant-table-thead>tr>th]:border-r');
      case 'striped':
        return cn(baseStyles, '[&_.ant-table-tbody>tr:nth-child(odd)]:bg-gray-50');
      default:
        return cn(baseStyles, '');
    }
  };

  const defaultPagination = {
    pageSize: 10,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total: number, range: [number, number]) => 
      `${range[0]}-${range[1]} of ${total} items`,
  };

  return (
    <AntTable<T>
      size={tableSize}
      className={cn(getTableStyles(), className)}
      
      pagination={{
        ...defaultPagination,
        ...props.pagination,
      }}
      {...props}
    />
  );
};

export default Table;
