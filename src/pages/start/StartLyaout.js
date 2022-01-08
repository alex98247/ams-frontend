import React from "react";
import {Button, Divider, List} from "antd";
import {BasePage} from "../BasePage";
import "./startLayout.css"
import {WorkflowService} from "../service/WorkflowService";
import {LoginService} from "../service/LoginService";

export class StartLayout extends React.Component {

    state = {tasks: []};

    componentDidMount() {
       this.loadTasks(LoginService.getUsername())
    }

    loadTasks(username) {
        WorkflowService.getTasks(username).then(response => {
            console.log(response);
            return response;
        }).then((response) => this.setState({tasks: response.data}))
    }

    onItemClick(id, definitionKey) {
        console.log(definitionKey)
        switch (definitionKey) {
            case 'Activity_identify_customer':
                this.props.history.push('/customer/identify/' + id)
                break
            case 'Activity_create_customer':
                this.props.history.push('/customer/create/' + id)
                break
            case 'Activity_create_application':
                this.props.history.push('/application/' + id)
                break
        }
    }

    onCreateApplicationClick() {
        let username = LoginService.getUsername()
        WorkflowService.startWorkflow(username)
        this.loadTasks(username)
    }

    render() {
        return (
            <BasePage>
                <Button onClick={() => this.onCreateApplicationClick()} style={{marginTop: "10px"}}
                        type="primary">Создать заявку</Button>
                <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
                    <Divider orientation="left">Задачи</Divider>
                    <List
                        size="large"
                        bordered
                        dataSource={this.state.tasks}
                        renderItem={
                            item => <List.Item className="ant-list-item"
                                               onClick={() => this.onItemClick(item.id, item.definitionKey)}>
                                {item.name}
                            </List.Item>
                        }
                    />
                </div>
            </BasePage>
        )
    }
}