import React from "react";
import "./login.css"
import {message, Button, Input} from "antd";
import {LoginService} from "../service/LoginService";
import Title from "antd/es/typography/Title";

export class Login extends React.Component {

    state = {credentials: this.credentials};

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
        return (
            <div className={"loginScreen"}>
                <Title style={{color: "white", fontSize: "100px"}} className={"companyName"}>Кофемолка</Title>
                <div className={"loginWrapper"}>
                    <Input name={"login"} onChange={this.handleChange} placeholder="Логин"/>
                    <Input.Password name={"password"} onChange={this.handleChange} style={{marginTop: "10px"}}
                                    placeholder="Пароль"/>
                    <Button onClick={this.handleLogin} style={{marginTop: "10px"}} type="primary">Вход</Button>
                </div>
            </div>
        );
    }
}
