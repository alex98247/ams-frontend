import React from "react";
import {Button, Divider, Input} from "antd";
import {BasePage} from "../../BasePage";
import {WarehouseService} from "../../service/WarehouseService";

export class GoodLayout extends React.Component {

    state = {data: {name: '', count: 0}};

    componentDidMount() {
        let id = this.props.match.params.id
        if (id === undefined) {
            return
        }
        WarehouseService.getGood(id).then((response) => this.setState({data: response.data}))
    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let data = {...this.state.data};
        data[name] = value;
        this.setState({data: data});
    }

    onCreateGoodClick() {
        WarehouseService.upsert(this.state.data).then(() => this.props.history.push('/warehouse'))
    }

    render() {
        let data = {...this.state.data};
        console.log(this.state.data)
        return (
            <BasePage>
                <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
                    Название: <Input name={"name"} onChange={this.handleChange} value={data.name}/>
                    Количество: <Input name={"count"} onChange={this.handleChange}
                                       value={data.count}/>
                </div>
                <Button onClick={() => this.props.history.push('/warehouse')} style={{marginTop: "10px"}}>Назад</Button>
                <Button onClick={() => this.onCreateGoodClick()} style={{marginLeft: "10px"}}
                        type="primary">{data.id ? "Обновить" : "Добавить товар"}</Button>
            </BasePage>
        )
    }
}