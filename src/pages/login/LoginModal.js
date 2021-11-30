import React from "react";
import "./login.css"
import {message, Button, Input} from "antd";
import {LoginService} from "../service/LoginService";
import Modal from "antd/es/modal/Modal";

export class LoginModal extends React.Component {

    state = {
        credentials: this.credentials,
        visible: false,
        confirmLoading: false,
        modalText: 'Content of the modal'
    };

    showModal = () => {
        this.setState({visible: true});
    };

    handleOk = () => {
        this.setState({modalText: 'The modal will be closed after two seconds', confirmLoading: true});
        setTimeout(() => {
            this.this.setState({visible: false, confirmLoading: false});
        }, 2000);
    };

    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({visible: true});
    };

    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let credentials = {...this.state.credentials};
        credentials[name] = value;
        this.setState({credentials});
    }

    handleLogin = (event) => {
        let credentials = {...this.state.credentials};
        let err = LoginService.login(credentials.login, credentials.password)
        err.then((e) => this.props.history.push('/admin/employee')).catch((e) => message.error('Не верный логин или пароль'))
    }

    render() {
        let modalText = {...this.state.modalText};
        let visible = {...this.state.visible};
        return (
            <>
                <Button type="primary" onClick={()=>this.showModal}>
                    Open Modal with async logic
                </Button>
                <Modal
                    title="Title"
                    visible={visible}
                    onOk={() => this.handleOk}
                    confirmLoading={() => this.confirmLoading}
                    onCancel={() => this.handleCancel}
                >
                    <p>{modalText}</p>
                </Modal>
            </>
        );
    }
}
