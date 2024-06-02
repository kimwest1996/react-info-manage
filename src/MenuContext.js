import React, { createContext, useContext, useState, useEffect } from 'react';

const MenuContext = createContext();

export const useMenu = () => useContext(MenuContext);

export const MenuProvider = ({ children }) => {
    const initialData = [
        { key: '1', name: '商品', level: '一级', frontendName: 'pms', icon: 'shop', visible: true, order: 0 },
        { key: '2', name: '订单', level: '一级', frontendName: 'oms', icon: 'ordered-list', visible: true, order: 0 },
        { key: '3', name: '营销', level: '一级', frontendName: 'sms', icon: 'mail', visible: true, order: 0 },
        { key: '4', name: '权限', level: '一级', frontendName: 'ums', icon: 'setting', visible: true, order: 0 },
        { key: '5', name: '用户管理', level: '二级', frontendName: 'user-list', icon: 'user', visible: true, order: 0, parent: '4' },
        { key: '6', name: '菜单管理', level: '二级', frontendName: 'menu-management', icon: 'appstore', visible: true, order: 0, parent: '4' },
    ];

    const loadMenuData = () => {
        const storedData = localStorage.getItem('menuData');
        return storedData ? JSON.parse(storedData) : initialData;
    };

    const [menuData, setMenuData] = useState(loadMenuData());

    useEffect(() => {
        localStorage.setItem('menuData', JSON.stringify(menuData));
    }, [menuData]);

    const updateMenuData = (newData) => {
        setMenuData(newData);
    };

    return (
        <MenuContext.Provider value={{ menuData, updateMenuData }}>
            {children}
        </MenuContext.Provider>
    );
};
