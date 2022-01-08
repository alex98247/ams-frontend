import {Layout, Menu} from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined
} from '@ant-design/icons';
import React from "react";
import {Content, Header} from "antd/es/layout/layout";
import history from './history/history';

const {Sider} = Layout;

export class BasePage extends React.Component {
    state = {
        collapsed: false,
        selector: 'employee'
    };

    componentDidMount() {
        let selector = this.getLastItem(window.location.href);
        this.setState({selector: selector})
    }

    getLastItem = thePath => thePath.substring(thePath.lastIndexOf('/') + 1)

    onCollapse = collapsed => this.setState({collapsed})

    onTasksClick = (event) => history.push('/start')
    onUsersClick = (event) => history.push('/admin/user')
    onRolesClick = (event) => history.push('/admin/role')

    render() {
        const {collapsed, selector} = this.state;
        return (
            <Layout style={{minHeight: '100vh'}}>
                <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
                    <div className="logo"/>
                    <Menu theme="dark" defaultSelectedKeys={[selector]} mode="inline">
                        <Menu.Item onClick={this.onUsersClick} key="user" icon={<PieChartOutlined/>}>
                            Пользователи
                        </Menu.Item>
                        <Menu.Item onClick={this.onTasksClick} key="employee" icon={<DesktopOutlined/>}>
                            Задачи
                        </Menu.Item>
                        <Menu.Item onClick={this.onRolesClick} key="role" icon={<FileOutlined/>}>
                            Роли
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{padding: 0}}/>
                    <Content style={{margin: '0 16px'}}>
                        {this.props.children}
                    </Content>
                </Layout>
            </Layout>
        );
    }
}