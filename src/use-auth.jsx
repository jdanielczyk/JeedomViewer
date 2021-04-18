import React, { useContext, createContext, useState } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

// eslint-disable-next-line react/prop-types
export const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth()
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

const useProvideAuth = () => {
  const [user, setUser] = useState(null)
  const [loginAttemptCount, setLoginAttemptCount] = useState(0)

  const signIn = (username, password) => {
    setLoginAttemptCount(loginAttemptCount + 1)
    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')

    const urlencoded = new URLSearchParams()
    urlencoded.append('username', username)
    urlencoded.append('password', password)

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    }

    fetch('/api/login', requestOptions)
      .then(response => response.json())
      .then(result => {
        setUser(result.success)
        setLoginAttemptCount(0)
      })
      .catch((err) => console.error(err))
  }

  const signOut = () => {
    fetch('/api/logout', { method: 'GET', redirect: 'follow' })
      .then(response => response.json())
      .then(() => setUser(null))
      .catch((err) => console.error(err))
  }

  const getAuthenUser = () => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    }

    fetch('/api/isAuthent', requestOptions)
      .then(response => response.json())
      .then(result => setUser(result.success))
      .catch(error => console.log('error', error))
  }

  return { user, loginAttemptCount, signIn, signOut, getAuthenUser }
}
