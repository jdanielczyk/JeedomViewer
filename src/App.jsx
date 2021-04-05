import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';

import './App.css';

import Login from './Components/Login';
// import DataReader from './Components/DataReader';

function App() 
{
    return (
        <Router>
            <Link to='/login'>Login</Link>
            {/* <div className="App">
                <DataReader title="Mode" commandId="266" />
                <DataReader title="Température bureau" commandId="640" isTemp={true}/>
                <DataReader title="Température étage" commandId="432" isTemp={true}/>
                <DataReader title="Température RDC" commandId="431" isTemp={true}/>
            </div> */}
            <Switch>
                <Route exact path='/'>
                    <div>test</div>
                </Route>
                <Route path='/login'>
                    <Login/>
                </Route>
                <Route path='/prout'>
                    prout
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
