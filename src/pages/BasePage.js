import {Layout, Menu} from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined
} from '@ant-design/icons';
import React from "react";
import {Content, Header} from "antd/es/layout/layout";
import history from './history/history';
import {LoginService} from "./service/LoginService";

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
    onWarehouseClick = (event) => history.push('/warehouse')

    render() {
        const {collapsed, selector} = this.state;
        return (
            <Layout style={{minHeight: '100vh'}}>
                <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
                    <div className="logo"/>
                    <Menu theme="dark" defaultSelectedKeys={[selector]} mode="inline">
                        <Menu.Item onClick={this.onUsersClick} key="application" icon={<PieChartOutlined/>}>
                            Заявки
                        </Menu.Item>
                        <Menu.Item onClick={this.onTasksClick} key="task" icon={<DesktopOutlined/>}>
                            Задачи
                        </Menu.Item>
                        {(LoginService.getAuthorities().indexOf("ADMIN") > -1 || LoginService.getAuthorities().indexOf("ORDER")) ?
                            <Menu.Item onClick={this.onWarehouseClick} key="warehouse" icon={<FileOutlined/>}>
                                Склад
                            </Menu.Item>
                            :
                            ''
                        }
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