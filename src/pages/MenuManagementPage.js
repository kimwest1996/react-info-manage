import React, { useState } from 'react';
import { Layout, Table, Switch, Button, Modal, Form, Input, Select, message } from 'antd';
import { useMenu } from '../MenuContext';
import '../css/MenuManagementPage.css';

const { Content } = Layout;
const { Option } = Select;

const iconOptions = [
    { value: 'shop', label: 'shop' },
    { value: 'ordered-list', label: 'ordered-list' },
    { value: 'mail', label: 'mail' },
    { value: 'setting', label: 'setting' },
    { value: 'user', label: 'user' },
    { value: 'appstore', label: 'appstore' }
];

const MenuManagementPage = () => {
    const { menuData, updateMenuData } = useMenu();
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
            form.setFieldsValue({ visible: true });
        }
    };

    const handleOk = () => {
        form.validateFields().then(values => {
            if (editingItem) {
                updateMenuData(menuData.map(item => (item.key === editingItem.key ? { ...values, key: editingItem.key } : item)));
                message.success('修改成功');
            } else {
                updateMenuData([...menuData, { ...values, key: `${menuData.length + 1}` }]);
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
        updateMenuData(menuData.filter(item => item.key !== key));
        message.success('删除成功');
    };

    const toggleVisible = (key) => {
        const newData = menuData.map(item => item.key === key ? { ...item, visible: !item.visible } : item);
        updateMenuData(newData);
    };

    const columns = [
        { title: '编号', dataIndex: 'key', key: 'key' },
        { title: '菜单名称', dataIndex: 'name', key: 'name' },
        { title: '菜单级数', dataIndex: 'level', key: 'level' },
        { title: '前端名称', dataIndex: 'frontendName', key: 'frontendName' },
        { title: '前端图标', dataIndex: 'icon', key: 'icon', render: icon => <span className={`anticon anticon-${icon}`}></span> },
        {
            title: '是否显示', dataIndex: 'visible', key: 'visible', render: (text, record) => (
                <Switch checked={record.visible} onChange={() => toggleVisible(record.key)} />
            )
        },
        { title: '排序', dataIndex: 'order', key: 'order' },
        {
            title: '设置', dataIndex: 'settings', key: 'settings', render: (text, record) => (
                <Button type="link" onClick={() => message.info('查看下级功能未实现')}>查看下级</Button>
            )
        },
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
                <div className="menu-management-page">
                    <div className="menu-management-header">
                        <Button type="primary" onClick={() => showModal(null)}>添加</Button>
                    </div>
                    <Table columns={columns} dataSource={menuData} style={{ marginTop: 16 }} />
                </div>
            </Content>
            <Modal title={editingItem ? '编辑菜单' : '添加菜单'} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Form form={form} layout="vertical">
                    <Form.Item name="name" label="菜单名称" rules={[{ required: true, message: '请输入菜单名称' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="level" label="菜单级数" rules={[{ required: true, message: '请输入菜单级数' }]}>
                        <Select>
                            <Option value="一级">一级</Option>
                            <Option value="二级">二级</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="frontendName" label="前端名称" rules={[{ required: true, message: '请输入前端名称' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="icon" label="前端图标" rules={[{ required: true, message: '请选择前端图标' }]}>
                        <Select>
                            {iconOptions.map(option => (
                                <Option key={option.value} value={option.value}>{option.label}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name="visible" label="是否显示" valuePropName="checked">
                        <Switch />
                    </Form.Item>
                    <Form.Item name="order" label="排序" rules={[{ required: true, message: '请输入排序' }]}>
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item name="parent" label="父菜单" rules={[{ required: false }]}>
                        <Select allowClear>
                            {menuData.filter(item => item.level === '一级').map(option => (
                                <Option key={option.key} value={option.key}>{option.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </Layout>
    );
};

export default MenuManagementPage;
