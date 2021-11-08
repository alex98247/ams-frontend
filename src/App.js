import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Login} from "./pages/login/Login";
import {Admin} from "./pages/admin/Admin";
import "antd/dist/antd.css"

function App() {
    return (
        <div style={{position:"relative", height: "100vh"}}>
            <Router>
                <Switch>
                    <Route exact path="/" component={Login}/>
                    <Route exact path="/admin" component={Admin}/>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
