import './App.css';
import {Router as Router, Route, Switch} from "react-router-dom";
import {Login} from "./pages/login/Login";
import {EmployeeLayout} from "./pages/admin/employees/EmployeeLayout";
import "antd/dist/antd.css"
import {EmployeeDetails} from "./pages/admin/employees/EmployeeDetails";
import history from './pages/history/history';


function App() {
    return (
        <div style={{position: "relative", height: "100vh"}}>
            <Router history={history}>
                <Switch>
                    <Route exact path="/" component={Login}/>
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
