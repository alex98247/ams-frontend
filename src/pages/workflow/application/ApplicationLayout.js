import React from "react";
import {Button, Card, Divider, List, message} from "antd";
import {BasePage} from "../../BasePage";
import Search from "antd/es/input/Search";
import {LegalEntityService} from "../../service/LegalEntityService";
import {WorkflowService} from "../../service/WorkflowService";
import {ApplicationService} from "../../service/ApplicationService";

export class ApplicationLayout extends React.Component {

    state = {customer: {name: ''}, application: {}, selected: {name: '', inn: ''}};

    componentDidMount() {
        ApplicationService.get(this.props.match.params.id).then(result => this.setState({application: result.data}))
        console.log(this.state.application)
        LegalEntityService.getLegalEntityById(this.state.application.customerId).then(result => this.setState({customer: result.data}))
    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let data = {...this.state.data};
        data[name] = value;
        this.setState({data});
    }

    onSearch = (event) => {
        let data = {...this.state.data};
        let err = LegalEntityService.getLegalEntityByName(data.search)
        err.then((result) => this.setState({customers: result.data})).catch((e) => message.error('Не верный логин или пароль'))
    }

    onItemClick(selected) {
        this.setState({selected: selected})
    }

    onCreateCustomerClick() {
        console.log(this.props)
        WorkflowService.complete({
            taskId: this.props.match.params.id,
            variables: {"new": true}
        }).then((response) => this.props.history.push('/customer/create/' + response.data.id))
    }

    render() {
        return (
            <BasePage>
                <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
                    <Divider orientation="left">Товары на складе</Divider>
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
                            onClick={() => this.onItemClick(item)}> {item.name + ', ' + item.inn}</List.Item>}
                    />
                    <Divider orientation="left">Товары в заявке</Divider>
                    <List
                        size="large"
                        bordered
                        dataSource={this.state.customers}
                        renderItem={item => <List.Item
                            onClick={() => this.onItemClick(item)}> {item.name + ', ' + item.inn}</List.Item>}
                    />
                </div>
                <Card style={{width: 300}}>
                    <p>Название: {this.state.selected.name}</p>
                    <p>ИНН: {this.state.selected.inn}</p>
                </Card>
                <Button onClick={() => this.onCreateCustomerClick()} style={{marginTop: '20px'}}>Создать
                    контрагента</Button>
                <Button style={{marginLeft: '20px'}} type="primary">Далее</Button>
            </BasePage>
        )
    }
}