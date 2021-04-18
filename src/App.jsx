import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from 'react-router-dom'

import './App.css'

import { useAuth } from './use-auth'

import Home from './Components/Home/Home'
import Login from './Components/Login/Login'

const App = () => {
  const auth = useAuth()

  useEffect(() => {
    if (auth.loginAttemptCount > 0) auth.getAuthenUser()
  }, [auth.user])

  const renderHome = () => {
    return auth.user ? <Home /> : <Redirect to={{ pathname: '/login' }} />
  }

  return (
        <Router>
            {
                // duplicate renderHome ?
                auth.user
                  ? <button onClick={() => auth.signOut()}>Logout</button>
                  : <Link to='/login'>Log me in</Link>
            }
            LoginCount: {auth.loginAttemptCount}
            <Switch>
                <Route exact path='/' render={renderHome}/>
                <Route path='/login'>
                    <Login/>
                </Route>
            </Switch>
        </Router>
  )
}

export default App
