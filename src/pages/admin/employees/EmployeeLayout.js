import React from "react";
import {Layout} from "antd";
import {Content, Header} from "antd/es/layout/layout";
import {EmployeeService} from "../../service/EmployeeService";

export class EmployeeLayout extends React.Component {

    componentDidMount() {
        EmployeeService.getAllEmployees().then((response) => console.log(response))
    }

    render() {
        return (
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{padding: 0}}/>
                <Content style={{margin: '0 16px'}}>
                    <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
                        Bill is a cat.
                    </div>
                </Content>
            </Layout>
        )
    }
}