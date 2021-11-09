import { Layout, Menu, Breadcrumb } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import React from "react";
import {EmployeeLayout} from "./employees/EmployeeLayout";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export class Admin extends React.Component {
    state = {
        collapsed: false,
    };

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    render() {
        const { collapsed } = this.state;
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
                    <div className="logo" />
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1" icon={<PieChartOutlined />}>
                            Пользователи
                        </Menu.Item>
                        <Menu.Item key="2" icon={<DesktopOutlined />}>
                            Сотрудники
                        </Menu.Item>
                        <Menu.Item key="9" icon={<FileOutlined />}>
                            Роли
                        </Menu.Item>
                    </Menu>
                </Sider>
                <EmployeeLayout />
            </Layout>
        );
    }
}