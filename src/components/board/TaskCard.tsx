import React from 'react';
import { Card, Avatar, Button, Popconfirm, Tag } from 'antd';
import { UserOutlined, DeleteOutlined } from '@ant-design/icons';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useAtom } from 'jotai';
import { projectsAtom, Task } from '../../store';
import dayjs from 'dayjs';

interface TaskCardProps {
  task: Task;
  onDelete: (taskId: string) => void;
  isDragging?: boolean;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete, isDragging = false }) => {
  const [projects] = useAtom(projectsAtom);
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging || isSortableDragging ? 0.5 : 1,
  };

  const project = projects.find(p => p.id === task.projectId);

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      size="small"
      className={`cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow ${
        isDragging ? 'shadow-xl' : ''
      }`}
      actions={[
        <Popconfirm
          key="delete"
          title="Delete this task?"
          description="Are you sure you want to delete this task?"
          onConfirm={(e) => {
            e?.stopPropagation();
            onDelete(task.id);
          }}
          okText="Yes"
          cancelText="No"
          onCancel={(e) => e?.stopPropagation()}
        >
          <Button 
            type="text" 
            icon={<DeleteOutlined />} 
            size="small"
            danger
            onClick={(e) => e.stopPropagation()}
          />
        </Popconfirm>,
      ]}
    >
      <div className="space-y-2">
        <h4 className="font-medium text-sm mb-1 line-clamp-2">{task.title}</h4>
        
        {task.description && (
          <p className="text-xs text-gray-600 line-clamp-2">{task.description}</p>
        )}
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <Avatar size="small" icon={<UserOutlined />} />
            <span className="text-xs text-gray-600">{task.assignee}</span>
          </div>
          
          {project && (
            <Tag color="blue" className="text-xs">
              {project.name}
            </Tag>
          )}
        </div>
        
        <div className="text-xs text-gray-500">
          Created: {dayjs(task.createdAt).format('MMM DD')}
        </div>
      </div>
    </Card>
  );
};

export default TaskCard;
