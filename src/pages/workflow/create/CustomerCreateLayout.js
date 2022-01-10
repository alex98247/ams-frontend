import React from "react";
import {Button, Card, List, message} from "antd";
import {BasePage} from "../../BasePage";
import Search from "antd/es/input/Search";
import {LegalEntitySuggestService} from "../../service/LegalEntitySuggestService";
import {WorkflowService} from "../../service/WorkflowService";
import {LegalEntityService} from "../../service/LegalEntityService";
import {ApplicationService} from "../../service/ApplicationService";
import {LoginService} from "../../service/LoginService";

export class CustomerCreateLayout extends React.Component {
    emptyCustomer = {
        name: '',
        inn: '',
        ogrn: '',
        kpp: ''
    }

    state = {customers: [], data: {search: 'ООО Ромашка'}, selected: this.emptyCustomer};

    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let data = {...this.state.data};
        data[name] = value;
        this.setState({data});
    }

    onItemClick(selected) {
        this.setState({selected: selected})
    }

    onSearch = (event) => {
        let data = {...this.state.data};
        let err = LegalEntitySuggestService.suggest(data.search)
        err.then((result) => this.setState({customers: result.data})).catch((e) => message.error('Не верный логин или пароль'))
    }

    onCreateCustomerClick() {
        LegalEntityService.saveLegalEntity(this.state.selected).then(() => {
            LegalEntityService.saveLegalEntityByInn(this.state.selected.inn).then(resp => {
                WorkflowService.getTask(this.props.match.params.id)
                    .then(response => {
                        ApplicationService.upsert({
                            id: Number(response.data.applicationId),
                            customerId: resp.data.id,
                            managerUsername: LoginService.getUsername()
                        })
                            .then(response => {
                                WorkflowService.complete({
                                    taskId: this.props.match.params.id,
                                    variables: {}
                                }).then((r) => this.props.history.push('/application/' + r.data.id))
                            });
                    })
            })
        });
    }

    render() {
        return (
            <BasePage>
                <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
                    <Search
                        name="search"
                        placeholder="ООО Ромашка"
                        allowClear
                        enterButton="Найти"
                        onChange={this.handleChange}
                        size="large"
                        onSearch={this.onSearch}
                    />
                    <List
                        size="large"
                        bordered
                        dataSource={this.state.customers}
                        renderItem={item => <List.Item
                            onClick={() => this.onItemClick(item)}>{item.value + ', ' + item.inn + ', ' +
                        (item.management ? (item.management.post + ': ' + item.management.name) : '')}</List.Item>}
                    />
                    {/*                    <Divider orientation="left">Сотрудники</Divider>
                    <List
                        size="large"
                        bordered
                        dataSource={this.data}
                        renderItem={item => <List.Item>{item}</List.Item>}
                    />*/}
                </div>
                <Card style={{width: 500}}>
                    <p>Название: {this.state.selected.value}</p>
                    <p>ИНН: {this.state.selected.inn}</p>
                    <p>ОГРН: {this.state.selected.ogrn}</p>
                    <p>КПП: {this.state.selected.kpp}</p>
                </Card>
                <Button onClick={() => this.onCreateCustomerClick()} style={{marginTop: '20px'}}
                        type="primary">Создать</Button>
                {/*                <Form
                    style={{marginTop: "50px"}}
                    labelCol={{span: 4}}
                    wrapperCol={{span: 14}}
                    layout="horizontal"
                    initialValues={{size: 'default'}}
                    size={'default'}
                >
                    <Divider orientation="center">Контрагент</Divider>
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
                </Form>*/}

            </BasePage>
        )
    }

}