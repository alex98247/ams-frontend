import React from "react";
import {Divider, Layout, List} from "antd";
import {Content, Header} from "antd/es/layout/layout";
import {EmployeeService} from "../../service/EmployeeService";

export class EmployeeLayout extends React.Component {

    state = {employees: []};

    componentDidMount() {
        EmployeeService.getAllEmployees().then((response) => this.setState({employees: response.data}))
    }

    data = [
        'Racing car sprays burning fuel into crowd.',
        'Japanese princess to wed commoner.',
        'Australian walks 100km after outback crash.',
        'Man charged over missing wedding girl.',
        'Los Angeles battles huge wildfires.',
    ];

    render() {
        return (
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{padding: 0}}/>
                <Content style={{margin: '0 16px'}}>
                    <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
                        <Divider orientation="left">Large Size</Divider>
                        <List
                            size="large"
                            header={<div>Header</div>}
                            footer={<div>Footer</div>}
                            bordered
                            dataSource={this.data}
                            renderItem={item => <List.Item>{item}</List.Item>}
                        />
                    </div>
                </Content>
            </Layout>
        )
    }
}