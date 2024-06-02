import React, { useState } from 'react';
import { Layout, Table, Switch, Button, Modal, Form, Input, message } from 'antd';
import '../css/UserPage.css';

const { Content } = Layout;

const initialData = [
    { key: '1', username: 'test', name: '测试账号', email: 'test@qq.com', createTime: '2018-09-29 13:55:30', lastLoginTime: '2018-09-29 13:55:39', enabled: true },
    { key: '2', username: 'admin', name: '系统管理员', email: 'admin@163.com', createTime: '2018-10-08 13:32:47', lastLoginTime: '2019-04-20 12:45:16', enabled: true },
    { key: '3', username: 'macro', name: 'macro', email: 'macro@qq.com', createTime: '2019-10-06 15:53:51', lastLoginTime: '2020-02-03 14:55:55', enabled: true },
    { key: '4', username: 'productAdmin', name: '商品管理员', email: 'product@qq.com', createTime: '2020-02-07 16:15:08', lastLoginTime: 'N/A', enabled: true },
];

const UserPage = () => {
    const [data, setData] = useState(initialData);
    const [editingItem, setEditingItem] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    const showModal = (item) => {
        setEditingItem(item);
        setIsModalVisible(true);
        if (item) {
            form.setFieldsValue(item);
        } else {
            form.resetFields();
        }
    };

    const handleOk = () => {
        form.validateFields().then(values => {
            if (editingItem) {
                setData(data.map(item => (item.key === editingItem.key ? { ...values, key: editingItem.key } : item)));
                message.success('修改成功');
            } else {
                setData([...data, { ...values, key: `${data.length + 1}` }]);
                message.success('添加成功');
            }
            setIsModalVisible(false);
            form.resetFields();
        });
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    const handleDelete = (key) => {
        setData(data.filter(item => item.key !== key));
        message.success('删除成功');
    };

    const columns = [
        { title: '编号', dataIndex: 'key', key: 'key' },
        { title: '账号', dataIndex: 'username', key: 'username' },
        { title: '姓名', dataIndex: 'name', key: 'name' },
        { title: '邮箱', dataIndex: 'email', key: 'email' },
        { title: '添加时间', dataIndex: 'createTime', key: 'createTime' },
        { title: '最后登录', dataIndex: 'lastLoginTime', key: 'lastLoginTime' },
        {
            title: '是否启用', dataIndex: 'enabled', key: 'enabled', render: (text, record) => (
                <Switch checked={record.enabled} onChange={() => {
                    setData(data.map(item => item.key === record.key ? { ...item, enabled: !item.enabled } : item));
                }} />
            )
        },
        {
            title: '操作', key: 'action', render: (text, record) => (
                <span>
                    <Button type="link" onClick={() => message.info('分配角色功能未实现')}>分配角色</Button>
                    <Button type="link" onClick={() => showModal(record)}>编辑</Button>
                    <Button type="link" onClick={() => handleDelete(record.key)}>删除</Button>
                </span>
            )
        }
    ];

    return (
        <Layout style={{ padding: '24px' }}>
            <Content>
                <div className="user-page">
                    <div className="user-page-header">
                        <Button type="primary" onClick={() => showModal(null)}>添加</Button>
                    </div>
                    <Table columns={columns} dataSource={data} style={{ marginTop: 16 }} />
                </div>
            </Content>
            <Modal title={editingItem ? '编辑用户' : '添加用户'} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Form form={form} layout="vertical">
                    <Form.Item name="username" label="账号" rules={[{ required: true, message: '请输入账号' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="name" label="姓名" rules={[{ required: true, message: '请输入姓名' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="email" label="邮箱" rules={[{ required: true, message: '请输入邮箱' }]}>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </Layout>
    );
};

export default UserPage;
