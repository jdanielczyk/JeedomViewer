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
    auth.getAuthenUser()
  }, [auth.user])

  const renderHome = () => {
    return auth.user ? <Home /> : <Redirect to={{ pathname: '/login' }} />
  }

  return (
        <Router>
            {
                auth.user ? <button onClick={() => auth.signOut()}>Logout</button> : <Link to='/login'>Login</Link>
            }
            <Switch>
                <Route exact path='/' render={renderHome}/>
                <Route path='/login'>
                    <Login />
                </Route>
            </Switch>
        </Router>
  )
}

export default App
