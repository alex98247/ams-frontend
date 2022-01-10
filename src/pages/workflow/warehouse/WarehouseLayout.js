import React from "react";
import {Button, Divider, List} from "antd";
import {BasePage} from "../../BasePage";
import {LoginService} from "../../service/LoginService";
import {WarehouseService} from "../../service/WarehouseService";

export class WarehouseLayout extends React.Component {

    state = {goods: []};

    componentDidMount() {
        this.loadGoods(LoginService.getUsername())
    }

    loadGoods() {
        WarehouseService.getAllGoods().then(response => {
            console.log(response);
            return response;
        }).then((response) => this.setState({goods: response.data}))
    }

    onItemClick(id) {
        this.props.history.push('/good/'+id)
    }

    onCreateGoodClick() {
        this.props.history.push('/good')
    }

    render() {
        return (
            <BasePage>
                <Button onClick={() => this.onCreateGoodClick()} style={{marginTop: "10px"}}
                        type="primary">Добавить товар</Button>
                <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
                    <Divider orientation="left">Товар</Divider>
                    <List
                        size="large"
                        bordered
                        dataSource={this.state.goods}
                        renderItem={
                            item => <List.Item onClick={() => this.onItemClick(item.id)}
                                               className="ant-list-item">
                                {item.name + "    -      " + item.count + " шт."}
                            </List.Item>
                        }
                    />
                </div>
            </BasePage>
        )
    }
}