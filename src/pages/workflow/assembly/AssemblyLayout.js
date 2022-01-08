import React from "react";
import {Button} from "antd";
import {BasePage} from "../../BasePage";
import {WorkflowService} from "../../service/WorkflowService";

export class AssemblyLayout extends React.Component {

    state = {application: {}};

    componentDidMount() {

    }

    onConfirmClick() {
        console.log(this.props)
        WorkflowService.complete({
            taskId: this.props.match.params.id,
            variables: {}
        }).then((response) => this.props.history.push('/start'))
    }

    render() {
        return (
            <BasePage>
                <Button onClick={() => this.onConfirmClick()} style={{marginTop: '20px'}}>Подтвердить сборку</Button>
            </BasePage>
        )
    }
}