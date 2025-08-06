import React, { useState } from 'react';
import { Card, Button, Input, Modal, Form, Select, Typography, App } from 'antd';
import { PlusOutlined, UserOutlined } from '@ant-design/icons';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useAtom } from 'jotai';
import { tasksAtom, projectsAtom, Task } from '../store';
import TaskCard from '../components/board/TaskCard';
import DroppableColumn from '../components/board/DroppableColumn';

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

interface TaskFormValues {
  title: string;
  description: string;
  projectId: string;
  assignee: string;
}

const KanbanBoard: React.FC = () => {
  const [tasks, setTasks] = useAtom(tasksAtom);
  const [projects] = useAtom(projectsAtom);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const { message } = App.useApp();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const todoTasks = tasks.filter(task => task.status === 'todo');
  const inProgressTasks = tasks.filter(task => task.status === 'inprogress');
  const doneTasks = tasks.filter(task => task.status === 'done');

  const handleDragStart = (event: DragStartEvent) => {
    const task = tasks.find(t => t.id === event.active.id);
    setActiveTask(task || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as 'todo' | 'inprogress' | 'done';

    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );

    setActiveTask(null);
  };

  const handleAddTask = (values: TaskFormValues) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: values.title,
      description: values.description,
      projectId: values.projectId,
      status: 'todo',
      assignee: values.assignee,
      createdAt: new Date().toISOString(),
    };

    setTasks(prevTasks => [...prevTasks, newTask]);
    setIsModalVisible(false);
    form.resetFields();
    message.success('Task created successfully!');
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    message.success('Task deleted successfully!');
  };

  const columns = [
    { id: 'todo', title: 'To Do', tasks: todoTasks, color: '#f0f0f0' },
    { id: 'inprogress', title: 'In Progress', tasks: inProgressTasks, color: '#e6f7ff' },
    { id: 'done', title: 'Done', tasks: doneTasks, color: '#f6ffed' },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <Title level={2}>Kanban Board</Title>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={() => setIsModalVisible(true)}
        >
          Add Task
        </Button>
      </div>

      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          {columns.map(column => (
            <DroppableColumn
              key={column.id}
              id={column.id}
              title={column.title}
              color={column.color}
              count={column.tasks.length}
            >
              <SortableContext 
                items={column.tasks.map(task => task.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-2">
                  {column.tasks.map(task => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onDelete={handleDeleteTask}
                    />
                  ))}
                </div>
              </SortableContext>
            </DroppableColumn>
          ))}
        </div>

        <DragOverlay>
          {activeTask ? (
            <TaskCard task={activeTask} onDelete={() => {}} isDragging />
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Add Task Modal */}
      <Modal
        title="Add New Task"
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
        }}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddTask}
        >
          <Form.Item
            label="Task Title"
            name="title"
            rules={[{ required: true, message: 'Please enter task title!' }]}
          >
            <Input placeholder="Enter task title" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
          >
            <TextArea 
              rows={3} 
              placeholder="Enter task description (optional)" 
            />
          </Form.Item>

          <Form.Item
            label="Project"
            name="projectId"
            rules={[{ required: true, message: 'Please select a project!' }]}
          >
            <Select placeholder="Select project">
              {projects.map(project => (
                <Option key={project.id} value={project.id}>
                  {project.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Assignee"
            name="assignee"
            rules={[{ required: true, message: 'Please enter assignee name!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Enter assignee name" />
          </Form.Item>

          <Form.Item>
            <div className="flex justify-end space-x-2">
              <Button onClick={() => {
                setIsModalVisible(false);
                form.resetFields();
              }}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Add Task
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default KanbanBoard;
