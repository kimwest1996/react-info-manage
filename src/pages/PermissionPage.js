import React, { useState } from 'react';
import { Layout, Table, Button, Modal, Form, Input, message } from 'antd';
// import './PermissionPage.css';

const { Content } = Layout;

const initialData = [
    { key: '1', name: '权限1', description: '描述1', createTime: '2021-09-01 12:00:00' },
    { key: '2', name: '权限2', description: '描述2', createTime: '2021-09-01 12:30:00' },
    // 添加更多数据
];

const PermissionPage = () => {
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
        { title: '权限名称', dataIndex: 'name', key: 'name' },
        { title: '描述', dataIndex: 'description', key: 'description' },
        { title: '添加时间', dataIndex: 'createTime', key: 'createTime' },
        {
            title: '操作', key: 'action', render: (text, record) => (
                <span>
          <Button type="link" onClick={() => showModal(record)}>编辑</Button>
          <Button type="link" onClick={() => handleDelete(record.key)}>删除</Button>
        </span>
            )
        }
    ];

    return (
        <Layout style={{ padding: '24px' }}>
            <Content>
                <div className="permission-page">
                    <div className="permission-page-header">
                        <Button type="primary" onClick={() => showModal(null)}>添加</Button>
                    </div>
                    <Table columns={columns} dataSource={data} style={{ marginTop: 16 }} />
                </div>
            </Content>
            <Modal title={editingItem ? '编辑权限' : '添加权限'} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Form form={form} layout="vertical">
                    <Form.Item name="name" label="权限名称" rules={[{ required: true, message: '请输入权限名称' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="description" label="描述" rules={[{ required: true, message: '请输入描述' }]}>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </Layout>
    );
};

export default PermissionPage;
