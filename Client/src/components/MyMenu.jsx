import {
    GroupOutlined, ReadOutlined, SettingOutlined, ToolOutlined
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { useEffect } from 'react';
import { Link, Navigate, useNavigate} from 'react-router-dom';
const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

const items = [
    getItem('Quản trị hệ thống', 'sub1', <ToolOutlined />, [
        getItem(
            <Link to='/1'>Quản lý người dùng</Link>,
            '1'
        ),
        getItem(<Link to='/empty'>Quản lý chức năng</Link>, '2'),
        getItem(<Link to='/empty'>Phân quyền</Link>, '3'),
        getItem(<Link to='/empty'>Quản lý cấu hình</Link>, '4'),
        getItem(<Link to='/empty'>Quản trị dữ liệu</Link>, '5'),
        getItem(<Link to='/history-actions'>Nhật ký hệ thống</Link>, '6'),
        getItem(<Link to='/empty'>Hướng dẫn sử dụng</Link>, '7'),
        getItem(<Link to='/empty'>Tài khoản quản trị nhà trường</Link>, '8'),
    ]),
    getItem(<Link to='/empty'>Danh mục</Link>, 'sub2', <GroupOutlined />),
    getItem(<Link to='/empty'>Quản trị nhà trường</Link>, 'sub3', <ReadOutlined />),
    getItem(<Link to='/empty'>Quản lý ngân hàng câu hỏi</Link>, 'sub4', <SettingOutlined />),
];

function MyMenu() {
    const navigate = useNavigate();
    useEffect(() => {
        navigate('/1')
    },[])
    return (
        <Menu
            mode="inline"
            style={{
                height: '100%',
            }}
            defaultSelectedKeys={['1']}
            // defaultOpenKeys={['sub1']}
            items={items}
        />
    );
}

export default MyMenu;
