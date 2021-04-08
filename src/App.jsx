import React from 'react';
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
    // const [userIsAuthenticate, setUserIsAuthenticate] = useState(false);
    const auth = useAuth();

    return (
        <Router>
            <Link to='/login'>Login</Link>
            <div>User:{JSON.stringify(auth)}</div>
            <Switch>
                <Route exact path='/' render={()=> auth.user ? (<BaseView />) : ((<Redirect to={{pathname:'/login'}}/>))}/>
                <Route path='/login'>
                    {/* <Login onLogin={(isAuthenticate) => setUserIsAuthenticate(isAuthenticate)}/> */}
                    <Login />
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
