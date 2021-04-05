import React from 'react';
import './Login.css';

export default function Login () 
{
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
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    };


    return (
        <div className='container'>
            <form className='login'>
                <input type="text" name='username' id='username' placeholder='Username'/>
                <input type='password' name='password' id='password' placeholder='Password'/>
                <button onClick={sendLoginPassword}>Send</button>
            </form>
        </div>
    );
}