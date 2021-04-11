import React,{useContext, createContext, useState} from 'react';

const AuthContext = createContext();

export const useAuth = ()  => 
{
    return useContext(AuthContext);
};

// eslint-disable-next-line react/prop-types
export const ProvideAuth = ({children}) =>
{
    const auth = useProvideAuth();
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};


const useProvideAuth = () =>
{
    const [user, setUser] = useState(null);
    
    const signIn = (username, password) =>
    {
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

        let urlencoded = new URLSearchParams();
        urlencoded.append('username', username);
        urlencoded.append('password', password);

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch('http://localhost:4000/api/login', requestOptions)
            .then(response => response.json())
            .then(result => setUser(result.success))
            .catch((err) => console.error(err));
    };

    const signOut = () => setUser(null);

    return {user, signIn, signOut};
};