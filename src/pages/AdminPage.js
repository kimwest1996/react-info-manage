import React from 'react';
import { Layout, Menu } from 'antd';
import { HomeOutlined, ShopOutlined, OrderedListOutlined, MailOutlined, SettingOutlined, UserOutlined, AppstoreOutlined } from '@ant-design/icons';
import { Link, Outlet } from 'react-router-dom';
import { useMenu } from '../MenuContext';
import '../css/AdminPage.css';

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

const iconMap = {
    shop: <ShopOutlined />,
    'ordered-list': <OrderedListOutlined />,
    mail: <MailOutlined />,
    setting: <SettingOutlined />,
    user: <UserOutlined />,
    appstore: <AppstoreOutlined />
};

const AdminPage = () => {
    const { menuData } = useMenu();

    const renderMenuItems = (items) => {
        return items.map(item => {
            if (item.level === '一级') {
                const children = menuData.filter(child => child.parent === item.key && child.visible);
                if (children.length > 0) {
                    return (
                        <SubMenu key={item.key} icon={iconMap[item.icon]} title={item.name}>
                            {renderMenuItems(children)}
                        </SubMenu>
                    );
                } else {
                    return (
                        <Menu.Item key={item.key} icon={iconMap[item.icon]}>
                            <Link to={`/admin/${item.frontendName}`}>{item.name}</Link>
                        </Menu.Item>
                    );
                }
            } else if (item.level === '二级' && item.visible) {
                return (
                    <Menu.Item key={item.key} icon={iconMap[item.icon]}>
                        <Link to={`/admin/${item.frontendName}`}>{item.name}</Link>
                    </Menu.Item>
                );
            }
            return null;
        });
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider>
                <div className="logo">管理系统</div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="home" icon={<HomeOutlined />}>
                        <Link to="/admin">首页</Link>
                    </Menu.Item>
                    {renderMenuItems(menuData.filter(item => item.level === '一级' && item.visible))}
                </Menu>
            </Sider>
            <Layout>
                <Header className="site-layout-background" style={{ padding: 0 }} />
                <Content style={{ margin: '16px' }}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminPage;
