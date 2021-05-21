import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Store from "./components/pages/Store";
import Cart from "./components/pages/Cart";
import Navigation from "./components/navigation/Navigation";
import Admin from "./components/pages/Admin";

function App() {
    return (
        <Router>
            <div className="App">
                <Navigation/>
                <Switch>
                    <Route exact path={"/"} component={Store}/>
                    <Route exact path={"/Cart"} component={Cart}/>
                    <Route exact path={"/Admin"} component={Admin}/>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
