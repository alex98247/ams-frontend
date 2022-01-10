import React from "react";
import {Button, Divider, Input} from "antd";
import {BasePage} from "../../BasePage";
import {WorkflowService} from "../../service/WorkflowService";
import {ApplicationService} from "../../service/ApplicationService";

export class DeliveryLayout extends React.Component {

    state = {application: {}};

    componentDidMount() {
        WorkflowService.getTask(this.props.match.params.id).then(response =>
            ApplicationService.get(response.data.applicationId).then(result => {
                this.setState({application: result.data});
            })
        )
    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let data = {...this.state.application};
        data[name] = value;
        this.setState({data: data});
    }

    onSubmitDeliveryClick() {
        ApplicationService.upsert(this.state.application).then(() => this.props.history.push('/start'))
    }

    render() {
        let data = {...this.state.application};
        return (
            <BasePage>
                <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
                    Название: <Input name={"delivery"} onChange={this.handleChange} value={data.delivery}/>
                </div>
                <Button onClick={() => this.onSubmitDeliveryClick()} style={{marginLeft: "10px"}}
                        type="primary">Подтвердить условия доставки</Button>
            </BasePage>
        )
    }
}