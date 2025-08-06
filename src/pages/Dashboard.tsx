import React, { useState } from 'react';
import { PlusOutlined, SearchOutlined, ProjectOutlined } from '@ant-design/icons';
import { Space, Row, Col, Statistic } from 'antd';
import { useAtom } from 'jotai';
import { projectsAtom, activeProjectsAtom, completedProjectsAtom, delayedProjectsAtom, Project } from '../store';
import ProjectsTable from '../components/table/ProjectsTable';
import ProjectFormModal from '../components/ProjectFormModal';
import { Input, Select, Button, Card } from 'antd';
const { Search } = Input;
const { Option } = Select;

const Dashboard: React.FC = () => {
  const [projects] = useAtom(projectsAtom);
  const [activeProjects] = useAtom(activeProjectsAtom);
  const [completedProjects] = useAtom(completedProjectsAtom);
  const [delayedProjects] = useAtom(delayedProjectsAtom);
  
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus = !statusFilter || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setIsModalVisible(true);
  };

  return (
    <div className="p-6">
      {/* Statistics Cards */}
      <Row gutter={16} className="mb-6">
        <Col span={6}>
          <Card variant="outlined" className="hover:scale-105 transition-transform">
            <Statistic
              title="Total Projects"
              value={projects.length}
              prefix={<ProjectOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card variant="outlined" className="hover:scale-105 transition-transform">
            <Statistic
              title="Active Projects"
              value={activeProjects.length}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card variant="outlined" className="hover:scale-105 transition-transform">
            <Statistic
              title="Completed Projects"
              value={completedProjects.length}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card variant="outlined" className="hover:scale-105 transition-transform">
            <Statistic
              title="Delayed Projects"
              value={delayedProjects.length}
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Projects Dashboard
        </h1>
        <Button
          color="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setEditingProject(null);
            setIsModalVisible(true);
          }}
        >
          Add Project
        </Button>
      </div>

      {/* Filters */}
      <Card variant="outlined" className="mb-6">
        <Space size="middle" className="w-full">
         
        <Space size="middle" className="w-full"/>
          <Input.Search
            placeholder="Search projects..."
            allowClear
            style={{ width: 300 }}
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
          />
          <Select
            placeholder="Filter by status"
            style={{ width: 150 }}
            allowClear
            value={statusFilter}
            onChange={(value) => setStatusFilter(value)}
          >
            <Option value="Active">Active</Option>
            <Option value="Completed">Completed</Option>
            <Option value="Delayed">Delayed</Option>
          </Select>
        </Space>
        </Card>
      {/* Projects Table */}
      <Card variant="outlined">
        <ProjectsTable
          projects={filteredProjects}
          onEdit={handleEdit}
        />
      </Card>

      {/* Project Form Modal */}
      <ProjectFormModal
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setEditingProject(null);
        }}
        project={editingProject}
      />
    </div>
  );
};

export default Dashboard;



