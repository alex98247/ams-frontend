import React from "react";
import {Button} from "antd";
import {BasePage} from "../../BasePage";
import {WorkflowService} from "../../service/WorkflowService";

export class CheckPaymentLayout extends React.Component {

    state = {application: {}};

    onConfirmClick() {
        console.log(this.props)
        WorkflowService.complete({
            taskId: this.props.match.params.id,
            variables: {"payed": true}
        }).then((response) => this.props.history.push('/assembly/' + response.data.id))
    }

    onRefuseClick() {
        console.log(this.props)
        WorkflowService.complete({
            taskId: this.props.match.params.id,
            variables: {"payed": false}
        }).then((response) => this.props.history.push('/start'))
    }

    render() {
        return (
            <BasePage>
                <Button onClick={() => this.onConfirmClick()} style={{marginTop: '20px'}}>Подтвердить оплату</Button>
                <Button onClick={() => this.onRefuseClick()} style={{marginLeft: '20px'}}
                        type="primary">Отклонить</Button>
            </BasePage>
        )
    }
}