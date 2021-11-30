import React from "react";
import {
    Button,
    Form,
    Input,
    Divider, message
} from "antd";
import {Admin} from "../Admin";
import {LoginService} from "../../service/LoginService";
import {EmployeeService} from "../../service/EmployeeService";

export class EmployeeDetails extends React.Component {

    state = {employee: this.employee};

    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let employee = {...this.state.employee};
        employee[name] = value;
        console.log(name, value)
        this.setState({employee});
    }

    onSave = (event) => {
        let employee = {...this.state.employee};
        let err = EmployeeService.saveEmployee(employee)
        err.then((e) => message.success('Запись успешно сохранена'))
            .catch((e) => message.error('Не удалось сохранить запись'))
    }

    render() {
        return (
            <Admin>
                <Form
                    style={{marginTop: "50px"}}
                    labelCol={{span: 4}}
                    wrapperCol={{span: 14}}
                    layout="horizontal"
                    initialValues={{size: 'default'}}
                    size={'default'}
                >
                    <Divider orientation="center">Сотрудник</Divider>
                    <Form.Item label="Имя">
                        <Input name={"name"} onChange={this.handleChange}/>
                    </Form.Item>
                    <Form.Item label="Фамилия">
                        <Input name={"surname"} onChange={this.handleChange}/>
                    </Form.Item>
                    <Form.Item label="Отчество">
                        <Input name={"patronymic"} onChange={this.handleChange} />
                    </Form.Item>
                    <Form.Item label="Должность">
                        <Input name={"position"} onChange={this.handleChange} />
                    </Form.Item>
                    <Form.Item label="Телефон">
                        <Input name={"phone"} onChange={this.handleChange} />
                    </Form.Item>
                    <Form.Item>
                        <Button onClick={this.onSave} type="primary">Сохранить</Button>
                    </Form.Item>
                </Form>
            </Admin>
        )
    }
}