import React from 'react';
import { EyeOutlined, UserOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import type { ColumnsType, TableProps } from 'antd/es/table';
import dayjs from 'dayjs';
import { Project } from '../../store';
import { Table, Tag, Button } from 'antd';

interface ProjectsTableProps {
  projects: Project[];
  onEdit: (project: Project) => void;
}

const ProjectsTable: React.FC<ProjectsTableProps> = ({ projects, onEdit }) => {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'green';
      case 'Completed': return 'blue';
      case 'Delayed': return 'red';
      default: return 'default';
    }
  };

  const columns: ColumnsType<Project> = [
    {
      title: 'Project Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text: string) => <span className="font-medium">{text}</span>,
    },
    {
      title: 'Owner',
      dataIndex: 'owner',
      key: 'owner',
      sorter: (a, b) => a.owner.localeCompare(b.owner),
      render: (text: string) => (
        <Space>
          <UserOutlined />
          {text}
        </Space>
      ),
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      sorter: (a, b) => dayjs(a.startDate).unix() - dayjs(b.startDate).unix(),
      render: (date: string) => dayjs(date).format('MMM DD, YYYY'),
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
      sorter: (a, b) => dayjs(a.dueDate).unix() - dayjs(b.dueDate).unix(),
      render: (date: string) => dayjs(date).format('MMM DD, YYYY'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: 'Active', value: 'Active' },
        { text: 'Completed', value: 'Completed' },
        { text: 'Delayed', value: 'Delayed' },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>{status}</Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            variant="link"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => navigate(`/project/${record.id}`)}
          >
            View
          </Button>
          <Button
            variant="link"
            size="small"
            onClick={() => onEdit(record)}
          >
            Edit
          </Button>
        </Space>
      ),
    },
  ];

  const tableProps: TableProps<Project> = {
    pagination: {
      pageSize: 10,
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} projects`,
    },
  };

  return (
    <Table
      columns={columns}
      dataSource={projects}
      rowKey="id"
      className="shadow-sm rounded-lg overflow-hidden"
      {...tableProps}
    />
  );
};

export default ProjectsTable;




































