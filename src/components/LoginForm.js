import React from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const navigate = useNavigate();

    const onFinish = (values) => {
        // 硬编码的测试用户数据
        const testUsers = [
            { username: 'testuser', password: 'Test1234' },
            { username: 'admin', password: 'Admin123' },
        ];

        // 从localStorage中获取用户数据
        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

        // 合并本地存储的用户数据和硬编码的测试用户数据
        const users = [...storedUsers, ...testUsers];

        // 验证用户输入的用户名和密码
        const user = users.find(user => user.username === values.username && user.password === values.password);

        if (user) {
            message.success('Login successful!');
            console.log('Logged in with:', values);
            localStorage.setItem('currentUser', JSON.stringify(user));
            navigate('/admin'); // 跳转到管理页面
        } else {
            message.error('Invalid username or password!');
        }
    };

    return (
        <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
        >
            <Form.Item
                name="username"
                rules={[{ required: true, message: 'Please input your Username!' }]}
            >
                <Input prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your Password!' }]}
            >
                <Input.Password prefix={<LockOutlined />} placeholder="Password" />
            </Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" block>
                    Login
                </Button>
            </Form.Item>
        </Form>
    );
};

export default LoginForm;
