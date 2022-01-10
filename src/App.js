import './App.css';
import {Router as Router, Route, Switch} from "react-router-dom";
import {Login} from "./pages/login/Login";
import {EmployeeLayout} from "./pages/admin/employees/EmployeeLayout";
import "antd/dist/antd.css"
import {EmployeeDetails} from "./pages/admin/employees/EmployeeDetails";
import history from './pages/history/history';
import {StartLayout} from "./pages/start/StartLyaout";
import {CustomerIdentifyLayout} from "./pages/workflow/identify/CustomerIdentifyLayout";
import {CustomerCreateLayout} from "./pages/workflow/create/CustomerCreateLayout";
import {ApplicationLayout} from "./pages/workflow/application/ApplicationLayout";
import {AssemblyLayout} from "./pages/workflow/assembly/AssemblyLayout";
import {CheckPaymentLayout} from "./pages/workflow/payment/CheckPaymentLayout";
import {WarehouseLayout} from "./pages/workflow/warehouse/WarehouseLayout";
import {GoodLayout} from "./pages/workflow/warehouse/GoodLayout";


function App() {
    return (
        <div style={{position: "relative", height: "100vh"}}>
            <Router history={history}>
                <Switch>
                    <Route exact path="/" component={Login}/>
                    <Route exact path="/start" component={StartLayout}/>
                    <Route exact path="/customer/identify/:id" component={CustomerIdentifyLayout}/>
                    <Route exact path="/customer/create/:id" component={CustomerCreateLayout}/>
                    <Route exact path="/application/:id" component={ApplicationLayout}/>
                    <Route exact path="/assembly/:id" component={AssemblyLayout}/>
                    <Route exact path="/payment/:id" component={CheckPaymentLayout}/>
                    <Route exact path="/warehouse" component={WarehouseLayout}/>
                    <Route exact path="/good/:id" component={GoodLayout}/>
                    <Route exact path="/good" component={GoodLayout}/>
                    <Route exact path="/admin" component={Login}/>
                    <Route exact path="/admin/employee" component={EmployeeLayout}/>
                    <Route path="/admin/employee/details" component={EmployeeDetails}>
                        <Route index component={EmployeeDetails}/>
                        <Route path=":id" component={EmployeeDetails}/>
                    </Route>
                    <Route path="*" component={<h2>Ресурс не найден</h2>}/>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
