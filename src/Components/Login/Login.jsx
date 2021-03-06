/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import './Login.css'

import { useAuth } from '../../use-auth'

const Login = () => {
  const auth = useAuth()
  const history = useHistory()

  const sendLoginPassword = (e) => {
    e.preventDefault()
    const username = document.querySelector('#username').value
    const password = document.querySelector('#password').value
    auth.signIn(username, password)
  }

  useEffect(() => auth.user ? history.push('/') : null, [auth.user])

  return (
        <div className='container'>
            <form className='login'>
                <input type="text" name='username' id='username' placeholder='Username'/>
                <input type='password' name='password' id='password' placeholder='Password'/>
                <button data-testid='login' onClick={sendLoginPassword}>Login</button>
            </form>
            { auth.user !== true && auth.loginAttemptCount > 0 ? <div className="error">Incorrect username or password</div> : ''}
        </div>
  )
}

export default Login
