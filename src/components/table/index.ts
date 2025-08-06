import React, { useState } from 'react';
import { Table, Input, Button, Space, Tag } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import { SearchOutlined } from '@ant-design/icons';

interface Project {
  key: string;
  name: string;
  owner: string;
  startDate: string;
  dueDate: string;
  status: 'Active' | 'Completed' | 'Delayed';
}

export const ProjectTable: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [filteredStatus, setFilteredStatus] = useState<string[]>([]);

  const columns: ColumnsType<Project> = [
    {
      title: 'Project Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search project"
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => confirm()}
            style={{ marginBottom: 8, display: 'block' }}
          />
          <Button
            type="primary"
            onClick={() => confirm()}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
      ),
      onFilter: (value, record) =>
        record.name.toLowerCase().includes((value as string).toLowerCase()),
    },
    {
      title: 'Owner',
      dataIndex: 'owner',
      key: 'owner',
      sorter: (a, b) => a.owner.localeCompare(b.owner),
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      sorter: (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
      sorter: (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
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
      render: (status) => {
        let color = '';
        switch (status) {
          case 'Active':
            color = 'geekblue';
            break;
          case 'Completed':
            color = 'green';
            break;
          case 'Delayed':
            color = 'volcano';
            break;
        }
        return <Tag color={color}>{status}</Tag>;
      },
    },
  ];

  const data: Project[] = [
    {
      key: '1',
      name: 'Project Alpha',
      owner: 'John Doe',
      startDate: '2023-01-15',
      dueDate: '2023-06-30',
      status: 'Active',
    },
    {
      key: '2',
      name: 'Project Beta',
      owner: 'Jane Smith',
      startDate: '2023-02-01',
      dueDate: '2023-05-15',
      status: 'Completed',
    },
    {
      key: '3',
      name: 'Project Gamma',
      owner: 'Mike Johnson',
      startDate: '2023-03-10',
      dueDate: '2023-07-20',
      status: 'Delayed',
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 10 }}
        onChange={(pagination, filters) => {
          if (filters.status) {
            setFilteredStatus(filters.status as string[]);
          }
        }}
      />
    </div>
  );
};