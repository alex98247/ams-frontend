import React from "react";
import {Button, Divider, Layout, List, message} from "antd";
import {Content, Header} from "antd/es/layout/layout";
import {EmployeeService} from "../../service/EmployeeService";
import {Admin} from "../Admin";
import {LoginService} from "../../service/LoginService";

export class EmployeeLayout extends React.Component {

    state = {employees: []};

    componentDidMount() {
        EmployeeService.getAllEmployees().then((response) => this.setState({employees: response.data}))
    }

    handleAddEmployeeClick = (event) => {
        this.props.history.push('/admin/employee/details')
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
            <Admin>
                <Button onClick={this.handleAddEmployeeClick} style={{marginTop: "10px"}}
                        type="primary">Добавить</Button>
                <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
                    <Divider orientation="left">Сотрудники</Divider>
                    <List
                        size="large"
                        bordered
                        dataSource={this.data}
                        renderItem={item => <List.Item>{item}</List.Item>}
                    />
                </div>

            </Admin>
        )
    }
}