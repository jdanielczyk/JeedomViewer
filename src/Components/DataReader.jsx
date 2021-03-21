/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import './DataReader.css';

const useTemp = () =>
{
    const [tempClass, setTempClass]  = useState('good');

    function setTemp(data) 
    {
        if(data < 18 ) setTempClass('cold');
        if(data > 23) setTempClass('hot');
    }
    
    return [tempClass, setTemp];
};

export default function DataReader({ id, title, isTemp }) 
{
    // Default useState
    const [data, setData] = useState('');
    const [error, setError] = useState(false);
    const [errorData, setErrorData] = useState();
    const [lastUpdate, setLastUpdate] = useState();

    // Custom Hook
    const [temp, setTemp] = useTemp(0);

    useEffect(() => 
    {
        const getData = async () => 
        {
            // eslint-disable-next-line no-undef
            fetch(`${process.env.REACT_APP_JEEDOM_URL}&type=cmd&id=${id}`)
                .then(
                    (response) => response.text()
                ).then(
                    (data) => 
                    {
                        setError(false);
                        setData(data);
                        setTemp(data);
                        const dateTime = new Date();
                        setLastUpdate(`${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}`);
                    },
                ).catch((error) => 
                {
                    setErrorData(error);
                    setError(true);
                });
        };

        getData();

        setInterval(() => 
        {
            getData();
        }, 15000);
    }, []);


    if (error) 
    {
        return (
            <div>Erreur {errorData}</div>
        );
    }
    

    return (
        <div className={isTemp ? 'card ' + temp:'card'}>
            <h2>{title}</h2>
            <div className="card-data">{data}</div>
            <div className="card-update">{lastUpdate}</div>
        </div>
    );
}