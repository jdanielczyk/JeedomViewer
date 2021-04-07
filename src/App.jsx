import React, {useState} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from 'react-router-dom';

import './App.css';

import Login from './Components/Login';
import DataReader from './Components/DataReader';

const BaseView = () => 
{
    return (
        <div className="App">
            <DataReader title="Mode" commandId="266" />
            <DataReader title="Température bureau" commandId="640" isTemp={true}/>
            <DataReader title="Température étage" commandId="432" isTemp={true}/>
            <DataReader title="Température RDC" commandId="431" isTemp={true}/>
        </div>
    );
};

const App = () =>
{
    // let history = useHistory();
    const [userIsAuthenticate, setUserIsAuthenticate] = useState(false);

    return (
        <Router>
            <Link to='/login'>Login</Link>
            <Switch>
                <Route exact path='/' render={()=> userIsAuthenticate ? (<BaseView />) : ((<Redirect to={{pathname:'/login'}}/>))}/>
                <Route path='/login'>
                    <Login onLogin={(isAuthenticate) => setUserIsAuthenticate(isAuthenticate)}/>
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
