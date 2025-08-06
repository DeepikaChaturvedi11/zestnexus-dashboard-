import React, { useEffect } from 'react';
import { App } from 'antd';
import { useAtom } from 'jotai';
import { projectsAtom, Project } from '../store';
import { Modal, Form, Input, DatePicker, Select } from 'antd';
import dayjs from 'dayjs';

const { TextArea } = Input;
const { Option } = Select;

interface ProjectFormModalProps {
  visible: boolean;
  onCancel: () => void;
  project?: Project | null;
}

interface ProjectFormValues {
  name: string;
  owner: string;
  startDate: dayjs.Dayjs;
  dueDate: dayjs.Dayjs;
  status: 'Active' | 'Completed' | 'Delayed';
  description?: string;
}

const ProjectFormModal: React.FC<ProjectFormModalProps> = ({
  visible,
  onCancel,
  project,
}) => {
  const [projects, setProjects] = useAtom(projectsAtom);
  const [form] = Form.useForm();
  const { message } = App.useApp();

  const isEditing = !!project;

  useEffect(() => {
    if (visible && project) {
      form.setFieldsValue({
        name: project.name,
        owner: project.owner,
        startDate: dayjs(project.startDate),
        dueDate: dayjs(project.dueDate),
        status: project.status,
        description: project.description,
      });
    } else if (visible) {
      form.resetFields();
    }
  }, [visible, project, form]);

  const handleSubmit = (values: ProjectFormValues) => {
    const projectData: Project = {
      id: project?.id || Date.now().toString(),
      name: values.name,
      owner: values.owner,
      startDate: values.startDate.format('YYYY-MM-DD'),
      dueDate: values.dueDate.format('YYYY-MM-DD'),
      status: values.status,
      description: values.description,
    };

    if (isEditing) {
      setProjects(prevProjects =>
        prevProjects.map(p => (p.id === project.id ? projectData : p))
      );
      message.success('Project updated successfully!');
    } else {
      setProjects(prevProjects => [...prevProjects, projectData]);
      message.success('Project created successfully!');
    }

    onCancel();
    form.resetFields();
  };

  return (
    <Modal
      title={isEditing ? 'Edit Project' : 'Add New Project'}
      open={visible}
      onCancel={onCancel}
      onOk={() => form.submit()}
      okText={isEditing ? 'Update' : 'Create'}
      cancelText="Cancel"
      className="max-w-full sm:max-w-[600px]"

    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          status: 'Active',
        }}
      >
        <Form.Item
          label="Project Name"
          name="name"
          rules={[
            { required: true, message: 'Please enter project name!' },
            { min: 3, message: 'Project name must be at least 3 characters!' },
          ]}
        >
          <Input placeholder="Enter project name" />
        </Form.Item>

        <Form.Item
          label="Owner"
          name="owner"
          rules={[{ required: true, message: 'Please enter project owner!' }]}
        >
          <Input placeholder="Enter project owner name" />
        </Form.Item>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            label="Start Date"
            name="startDate"
            rules={[{ required: true, message: 'Please select start date!' }]}
          >
            <DatePicker className="w-full" />
          </Form.Item>

          <Form.Item
            label="Due Date"
            name="dueDate"
            rules={[
              { required: true, message: 'Please select due date!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  const startDate = getFieldValue('startDate');
                  if (!value || !startDate || value.isAfter(startDate)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Due date must be after start date!'));
                },
              }),
            ]}
          >
            <DatePicker className="w-full" />
          </Form.Item>
        </div>

        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: 'Please select project status!' }]}
        >
          <Select placeholder="Select project status">
            <Select.Option value="Active">Active</Select.Option>
            <Select.Option value="Completed">Completed</Select.Option>
            <Select.Option value="Delayed">Delayed</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
        >
          <Input.TextArea
            rows={4}
            placeholder="Enter project description (optional)"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProjectFormModal;
