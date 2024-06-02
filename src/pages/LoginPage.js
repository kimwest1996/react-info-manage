import React, { useState } from 'react';
import { Layout, Tabs } from 'antd';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import '../css/LoginPage.css';

const { Content } = Layout;
const { TabPane } = Tabs;

const LoginPage = () => {
    const [currentTab, setCurrentTab] = useState('login');

    return (
        <Layout style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
            <Content className="layout-content">
                <div className="form-container">
                    <div className="logo">
                        <img src="your-logo-url" alt="logo" />
                        <h1>mall-admin-web</h1>
                    </div>
                    <Tabs
                        defaultActiveKey="login"
                        activeKey={currentTab}
                        onChange={setCurrentTab}
                        centered
                    >
                        <TabPane tab="Login" key="login">
                            <LoginForm />
                        </TabPane>
                        <TabPane tab="Register" key="register">
                            <RegisterForm />
                        </TabPane>
                    </Tabs>
                </div>
            </Content>
        </Layout>
    );
};

export default LoginPage;
