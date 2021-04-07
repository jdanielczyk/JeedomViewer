/* eslint-disable react/prop-types */
import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';

import './Login.css';

const Login = ({onLogin}) =>
{
    let history = useHistory();
    const [hasError, setHasError] = useState(false);

    const sendLoginPassword = (e) =>
    {
        e.preventDefault();
        const username = document.querySelector('#username').value;
        const password = document.querySelector('#password').value;
        fetchLogin(username, password);
    };


    const fetchLogin = (username, password) =>
    {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

        var urlencoded = new URLSearchParams();
        urlencoded.append('username', username);
        urlencoded.append('password', password);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch('http://localhost:4000/api/login', requestOptions)
            .then(response => response.json())
            .then(result => 
            {
                if(result.success)
                {
                    history.push('/');
                    onLogin(true);
                }
                else
                {
                    onLogin(false);
                }
            })
            .catch(() => setHasError(true));
    };


    return (
        <div className='container'>
            <form className='login'>
                <input type="text" name='username' id='username' placeholder='Username'/>
                <input type='password' name='password' id='password' placeholder='Password'/>
                <button onClick={sendLoginPassword}>Login</button>
            </form>
            <div className="error" style={hasError ? {display: 'block'} : {display:'none'}}>
                Incorrect username or password
            </div>
        </div>
    );
};

export default Login;