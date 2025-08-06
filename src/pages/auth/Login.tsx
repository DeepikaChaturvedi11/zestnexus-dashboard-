import React from 'react';
import { App, Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useSetAtom } from 'jotai';
import { currentUserAtom, isAuthenticatedAtom } from '../../store';
import { Card } from '../../components/ui';

interface LoginFormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const setCurrentUser = useSetAtom(currentUserAtom);
  const setIsAuthenticated = useSetAtom(isAuthenticatedAtom);
  const { message } = App.useApp();

  const onFinish = (values: LoginFormValues) => {
    if (values.password === '123456789' && values.email === 'admin@zestnexus.com') {
      const user = {
        id: '1',
        email: values.email,
        name: values.email.split('@')[0],
      };

      setCurrentUser(user);
      setIsAuthenticated(true);
      message.success('Login successful!');
      navigate('/dashboard');
    } else {
      message.error('Invalid credentials! Use password: "123456789" and email: "admin@zestnexus.com"');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <Card variant="elevated" className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            ZestNexus
          </h1>
          <p className="text-gray-600  text-xl">Project Manager Dashboard</p>
        </div>

        <Form name="login" initialValues={{ remember: true }} onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' },
            ]}
          >
            <Input
              size="large"
              prefix={<UserOutlined className="text-gray-400" />}
              placeholder="admin@zestnexus.com"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="123456789"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large">
              Sign In
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center text-sm text-gray-600 mt-4 p-4 bg-gray-50 rounded-lg">
          <p className="font-medium text-gray-800 mb-2">Demo credentials:</p>
          <p>Email: admin@zestnexus.com</p>
          <p>
            Password: <code className="bg-gray-300 px-1 rounded">123456789</code>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Login;
