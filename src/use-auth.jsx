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
    const [user, setUser] = useState({username:'John'});

    const signIn = () =>
    {
        setUser({username:'John2'});
    };

    const signOut = () =>
    {
        setUser(null);
    };

    return {user, signIn, signOut};
};