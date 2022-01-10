import React from "react";
import {Button, Divider, Form, Input, Select, Switch} from "antd";
import {BasePage} from "../../BasePage";
import {LegalEntityService} from "../../service/LegalEntityService";
import {WorkflowService} from "../../service/WorkflowService";
import {ApplicationService} from "../../service/ApplicationService";
import {WarehouseService} from "../../service/WarehouseService";
import {Option} from "antd/es/mentions";

export class ApplicationLayout extends React.Component {

    state = {
        customer: {name: '', inn: ''},
        application: {needDelivery: false},
        goods: [{name: ''}],
        goodsRender: [{id: '', name: '', count: 0}],
        selectedGoods: []
    };

    componentDidMount() {
        WorkflowService.getTask(this.props.match.params.id).then(response =>
            ApplicationService.get(response.data.applicationId).then(result => {
                this.setState({application: result.data});
                LegalEntityService.getLegalEntityById(result.data.customerId).then(r => this.setState({customer: r.data}))
            })
        )
        WarehouseService.getAllGoods().then((response) => this.setState({goods: response.data}))
    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let data = {...this.state.data};
        data[name] = value;
        this.setState({data});
    }

    onCreateApplicationClick() {
        this.state.application.goods = this.state.goodsRender.filter(x => x.id !== '')
            .reduce((map, obj) => {
                map[Number(obj.id)] = obj.count;
                return map;
            }, {});
        ApplicationService.upsert(this.state.application).then(() =>
            WorkflowService.complete({
                taskId: this.props.match.params.id,
                variables: {"needDelivery": this.state.application.needDelivery}
            }).then((response) => this.props.history.push('/start'))
        )
    }

    addMock() {
        let goodsRender = this.state.goodsRender
        let element = {id: '', name: '', count: 0}

        goodsRender.push(element)
        this.setState({goodsRender: goodsRender})
    }

    handleGoodChange(value, i) {
        let good = this.state.goodsRender[i]
        good.id = value
        if (i === this.state.goodsRender.length - 1) {
            this.addMock()
        }
    }

    onChange(checked) {
        let application = this.state.application
        application.needDelivery = checked
        this.setState({application: application});
    }

    handleCountChange = (event, i) => {
        let goods = this.state.goodsRender
        let good = goods[i]
        good.count = event.target.value
        this.setState({goodsRender: goods});
    }

    render() {
        let goods = this.state.goods

        return (
            <BasePage>
                <Form
                    style={{marginTop: "50px"}}
                    labelCol={{span: 4}}
                    wrapperCol={{span: 14}}
                    layout="horizontal"
                    initialValues={{size: 'default'}}
                    size={'default'}
                >
                    <Divider orientation="center">Заявка</Divider>
                    <Form.Item label="Контрагент">
                        <Input name={"name"} value={this.state.customer.name} onChange={this.handleChange}/>
                    </Form.Item>
                    <Form.Item label="Доставка">
                        <Switch defaultChecked={false} onChange={v => this.onChange(v)}/>
                    </Form.Item>
                </Form>

                {this.state.goodsRender.map((x, i) =>
                    <div style={{marginTop: 20}}>
                        <Select style={{width: 320}} onChange={(v) => this.handleGoodChange(v, i)}>
                            {goods.map(good => (
                                <Option key={good.id}>{good.name}</Option>
                            ))}
                        </Select>
                        {console.log(x)}
                        <Input onChange={v => this.handleCountChange(v, i)} name={"input-" + i}
                               style={{marginLeft: 20, width: 60}}
                               value={x.count}/>
                    </div>
                )}
                <Button onClick={() => this.onCreateApplicationClick()} type="primary" style={{marginTop: '20px'}}>Создать
                    заявку</Button>
            </BasePage>
        )
    }
}