import { Route, Switch,Router} from 'react-router-dom';
import React from 'react';
import history from './History';
import Home from './components/Home';
import Signup from './components/Signup';
import App from './App';
class Routes extends React.Component{
render(){
    return(
        <Router history={history}>
                <Switch>
                    <Route  path="/" exact component={App} /> 
                    <Route path="/home"  component={Home} /> 
                    <Route path="/signup"  component={Signup} /> 
                </Switch>
        </Router>
    )
}
}
export default Routes;