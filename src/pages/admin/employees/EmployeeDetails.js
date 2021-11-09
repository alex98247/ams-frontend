import React from "react";
import {
    Button,
    Cascader,
    DatePicker,
    Form,
    Input,
    Radio,
    InputNumber,
    Select,
    Switch,
    TreeSelect, Divider
} from "antd";
import {Admin} from "../Admin";

export class EmployeeDetails extends React.Component {

    state = {employee: this.employee};

    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let employee = {...this.state.employee};
        employee[name] = value;
        this.setState({employee});
    }

    onSave = (event) => {

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
                    <Form.Item name={"surname"} onChange={this.handleChange} label="Фамилия">
                        <Input/>
                    </Form.Item>
                    <Form.Item name={"patronymic"} onChange={this.handleChange} label="Отчество">
                        <Input/>
                    </Form.Item>
                    <Form.Item name={"position"} onChange={this.handleChange} label="Должность">
                        <Input/>
                    </Form.Item>
                    <Form.Item name={"phone"} onChange={this.handleChange} label="Телефон">
                        <Input/>
                    </Form.Item>
                    <Form.Item>
                        <Button onClick={this.onSave} type="primary">Сохранить</Button>
                    </Form.Item>
                </Form>
            </Admin>
        )
    }
}