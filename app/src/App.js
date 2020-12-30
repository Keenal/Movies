import React, { Component } from 'react';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import Genre from './Genre';
import Home from './Home';

class App extends Component {
    state = {  }
    render() { 
        return ( 
            <Router>
                <Switch>
                    <Route path="/" exact={true} component={Home}/>
                    <Route path="/genre" exact={true} component={Genre}/>
                </Switch>
            </Router>
         );
    }
}
 
export default App;