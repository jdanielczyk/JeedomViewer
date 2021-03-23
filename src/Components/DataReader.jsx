/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import './DataReader.css';


const useTemperature = () =>
{
    const [temperatureClass, setTemperatureClass]  = useState('good');

    function setTempClass(temperature) 
    {
        if(temperature < 18 ) setTemperatureClass('cold');
        if(temperature > 23) setTemperatureClass('hot');
    }
    
    return [temperatureClass, setTempClass];
};


const getFormatedDateTime = () =>
{
    var date = new Date();
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};


export default function DataReader({ id, title, isTemp }) 
{
    // Default useState
    const [dataFromJeedomApi, setDataFromJeedomApi] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [lastUpdate, setLastUpdate] = useState(getFormatedDateTime());
    
    // Custom hook
    const [temperatureClass, setTemperatureClass] = useTemperature(0);
    
    const processFetchedSuccessDataFromJeedomApi = (data) => 
    {
        setErrorMessage('');
        setDataFromJeedomApi(data);
        if(isTemp) setTemperatureClass(data);
        setLastUpdate(getFormatedDateTime());
    };


    const fetchJeedomApiData = async () => 
    {
        // eslint-disable-next-line no-undef
        fetch(`${process.env.REACT_APP_JEEDOM_URL}&type=cmd&id=${id}`)
            .then((response) => response.text())
            .then((dataFromJeedomApi) => processFetchedSuccessDataFromJeedomApi(dataFromJeedomApi))
            .catch((error) => setErrorMessage(error));
    };

    
    useEffect(() => 
    {
        // fetch before first setTimout
        // dataFromJeedomApi don’t stay empty until first setTimeout
        if(dataFromJeedomApi ==='') fetchJeedomApiData();

        const timeout = setTimeout(()=>
        {
            fetchJeedomApiData();
        }, 10000);

        return () => clearTimeout(timeout);
    });


    if (errorMessage !== '') 
    {
        return <div>Erreur {errorMessage}</div>;
    }
    

    return (
        <div className={isTemp ? 'card ' + temperatureClass : 'card'}>
            <h2>{title}</h2>
            <div className="card-data">{dataFromJeedomApi}</div>
            <div className="card-update">{lastUpdate}</div>
        </div>
    );
}