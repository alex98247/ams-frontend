import React from "react";
import {Button, Card, List, message} from "antd";
import {BasePage} from "../../BasePage";
import Search from "antd/es/input/Search";
import {LegalEntityService} from "../../service/LegalEntityService";
import {WorkflowService} from "../../service/WorkflowService";

export class CustomerIdentifyLayout extends React.Component {

    state = {customers: [], data: {search: 'ООО Ромашка'}, selected: {name: '', inn: ''}};

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

    onCreateApplicationClick() {
        console.log(this.props)
        WorkflowService.complete({
            taskId: this.props.match.params.id,
            variables: {"new": true}
        }).then((response) => this.props.history.push('/application/'+response.data.id))
    }

    onCreateCustomerClick() {
        console.log(this.props)
        WorkflowService.complete({
            taskId: this.props.match.params.id,
            variables: {"new": true}
        }).then((response) => this.props.history.push('/customer/create/'+response.data.id))
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
                            onClick={() => this.onItemClick(item)}> {item.name + ', ' + item.inn}</List.Item>}
                    />
                </div>
                <Card style={{width: 300}}>
                    <p>Название: {this.state.selected.name}</p>
                    <p>ИНН: {this.state.selected.inn}</p>
                </Card>
                <Button onClick={() => this.onCreateCustomerClick()} style={{marginTop: '20px'}}>Создать контрагента</Button>
                <Button onClick={() => this.onCreateApplicationClick()} style={{marginLeft: '20px'}} type="primary">Далее</Button>
            </BasePage>
        )
    }
}