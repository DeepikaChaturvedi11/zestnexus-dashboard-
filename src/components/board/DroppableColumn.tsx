import React from 'react';
import { Card, Badge } from 'antd';
import { useDroppable } from '@dnd-kit/core';

interface DroppableColumnProps {
  id: string;
  title: string;
  color: string;
  count: number;
  children: React.ReactNode;
}

const DroppableColumn: React.FC<DroppableColumnProps> = ({
  id,
  title,
  color,
  count,
  children,
}) => {
  const { isOver, setNodeRef } = useDroppable({ id });

  const getStatusColor = () => {
    switch (id) {
      case 'todo': return '#faad14';
      case 'inprogress': return '#1890ff';
      case 'done': return '#52c41a';
      default: return '#d9d9d9';
    }
  };

  return (
    <div
      ref={setNodeRef}
      className={`transition-all duration-200 ${
        isOver ? 'bg-blue-50 border-blue-300' : ''
      }`}
    >
      <Card
        title={
          <div className="flex items-center justify-between">
            <span className="font-semibold">{title}</span>
            <Badge 
              count={count} 
              style={{ backgroundColor: getStatusColor() }}
            />
          </div>
        }
        className="h-full"
        bodyStyle={{ 
          padding: '16px',
          backgroundColor: isOver ? color : 'transparent',
          minHeight: '500px',
          transition: 'background-color 0.2s ease',
        }}
      >
        {children}
      </Card>
    </div>
  );
};

export default DroppableColumn;
