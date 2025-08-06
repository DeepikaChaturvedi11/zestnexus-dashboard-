import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Descriptions, Tag, Button, Row, Col, Typography, Divider } from 'antd';
import { ArrowLeftOutlined, CalendarOutlined, UserOutlined, ProjectOutlined } from '@ant-design/icons';
import { useAtom } from 'jotai';
import { projectsAtom, tasksAtom } from '../../store';
import dayjs from 'dayjs';

const { Title, Paragraph } = Typography;

const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [projects] = useAtom(projectsAtom);
  const [tasks] = useAtom(tasksAtom);

  const project = projects.find(p => p.id === id);
  const projectTasks = tasks.filter(task => task.projectId === id);

  if (!project) {
    return (
      <div className="p-6">
        <Card className="text-center">
          <Title level={3}>Project Not Found</Title>
          <Paragraph>The requested project could not be found.</Paragraph>
          <Button 
            type="primary" 
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate('/dashboard')}
          >
            Back to Dashboard
          </Button>
        </Card>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'green';
      case 'Completed': return 'blue';
      case 'Delayed': return 'red';
      default: return 'default';
    }
  };

  const todoTasks = projectTasks.filter(task => task.status === 'todo').length;
  const inProgressTasks = projectTasks.filter(task => task.status === 'inprogress').length;
  const doneTasks = projectTasks.filter(task => task.status === 'done').length;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <Button 
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate('/dashboard')}
          className="mb-4"
        >
          Back to Projects
        </Button>
        <Title level={2} className="mb-0">{project.name}</Title>
      </div>

      <Row gutter={[24, 24]}>
        {/* Project Information */}
        <Col xs={24} lg={8}>
          <Card title="Project Information">
            <Descriptions column={1} size="small">
              <Descriptions.Item 
                label={<span><UserOutlined /> Owner</span>}
              >
                {project.owner}
              </Descriptions.Item>
              <Descriptions.Item 
                label={<span><CalendarOutlined /> Start Date</span>}
              >
                {dayjs(project.startDate).format('MMM DD, YYYY')}
              </Descriptions.Item>
              <Descriptions.Item 
                label={<span><CalendarOutlined /> Due Date</span>}
              >
                {dayjs(project.dueDate).format('MMM DD, YYYY')}
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                <Tag color={getStatusColor(project.status)}>
                  {project.status}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Duration">
                {dayjs(project.dueDate).diff(dayjs(project.startDate), 'day')} days
              </Descriptions.Item>
            </Descriptions>

            {project.description && (
              <>
                <Divider />
                <div>
                  <Title level={5}>Description</Title>
                  <Paragraph>{project.description}</Paragraph>
                </div>
              </>
            )}
          </Card>

          {/* Task Statistics */}
          <Card title="Task Overview" className="mt-4">
            <Row gutter={16}>
              <Col span={8} className="text-center">
                <div className="text-2xl font-bold text-yellow-600">{todoTasks}</div>
                <div className="text-sm text-gray-500">To Do</div>
              </Col>
              <Col span={8} className="text-center">
                <div className="text-2xl font-bold text-blue-600">{inProgressTasks}</div>
                <div className="text-sm text-gray-500">In Progress</div>
              </Col>
              <Col span={8} className="text-center">
                <div className="text-2xl font-bold text-green-600">{doneTasks}</div>
                <div className="text-sm text-gray-500">Done</div>
              </Col>
            </Row>
          </Card>
        </Col>

        {/* Project Tasks Kanban */}
        <Col xs={24} lg={16}>
          <Card title="Project Tasks" className="h-full">
            <div className="h-96 overflow-auto">
              {projectTasks.length > 0 ? (
                <div className="text-center text-gray-500 p-8">
                  <ProjectOutlined className="text-4xl mb-4" />
                  <p>Project tasks would be displayed here</p>
                  <p className="text-sm">Go to the Kanban Board to manage tasks</p>
                  <Button 
                    type="primary" 
                    onClick={() => navigate('/kanban')}
                    className="mt-4"
                  >
                    Open Kanban Board
                  </Button>
                </div>
              ) : (
                <div className="text-center text-gray-500 p-8">
                  <ProjectOutlined className="text-4xl mb-4" />
                  <p>No tasks found for this project</p>
                  <Button 
                    type="primary" 
                    onClick={() => navigate('/kanban')}
                    className="mt-4"
                  >
                    Add Tasks in Kanban Board
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProjectDetails;
