import React, { useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from 'react-router-dom';

import './App.css';

import {useAuth} from './use-auth';

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
    const auth = useAuth();


    useEffect(()=>
    {
        auth.getAuthenUser();
    },[auth.user]);


    return (
        <Router>
            {
                auth.user ? <button onClick={()=>auth.signOut()}>Logout</button> : <Link to='/login'>Login</Link>
            }
            <Switch>
                <Route exact path='/' render={()=> auth.user ? (<BaseView />) : ((<Redirect to={{pathname:'/login'}}/>))}/>
                <Route path='/login'>
                    <Login />
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
