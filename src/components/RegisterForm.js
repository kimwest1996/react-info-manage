import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';

const RegisterForm = () => {
    const onFinish = (values) => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = users.find(user => user.username === values.username);
        if (userExists) {
            message.error('Username already exists!');
            return;
        }

        users.push(values);
        localStorage.setItem('users', JSON.stringify(users));
        message.success('Registration successful!');
        console.log('Registered with:', values);
    };

    const passwordRules = [
        { required: true, message: 'Please input your Password!' },
        { min: 8, message: 'Password must be at least 8 characters!' },
        { max: 16, message: 'Password cannot be more than 16 characters!' },
        {
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,16}$/,
            message: 'Password must contain uppercase, lowercase letters and numbers!',
        },
    ];

    return (
        <Form
            name="register"
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
                name="email"
                rules={[
                    { required: true, message: 'Please input your Email!' },
                    { type: 'email', message: 'The input is not valid E-mail!' },
                ]}
            >
                <Input prefix={<MailOutlined />} placeholder="Email" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={passwordRules}
            >
                <Input.Password prefix={<LockOutlined />} placeholder="Password" />
            </Form.Item>
            <Form.Item
                name="confirm"
                dependencies={['password']}
                hasFeedback
                rules={[
                    { required: true, message: 'Please confirm your Password!' },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('The two passwords do not match!'));
                        },
                    }),
                ]}
            >
                <Input.Password prefix={<LockOutlined />} placeholder="Confirm Password" />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" block>
                    Register
                </Button>
            </Form.Item>
        </Form>
    );
};

export default RegisterForm;
