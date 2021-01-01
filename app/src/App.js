import React, { Component } from 'react';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import Genre from './Genre';
import Home from './Home';
import Movies from './Movies';

class App extends Component {
    state = {  }
    render() { 
        return ( 
            <Router>
                <Switch>
                    <Route path="/" exact={true} component={Home}/>
                    <Route path="/genres" exact={true} component={Genre}/>
                    <Route path="/movies" exact={true} component={Movies}/>
                </Switch>
            </Router>
         );
    }
}
 
export default App;