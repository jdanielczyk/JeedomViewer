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


const useLastUpdate = () =>
{
    const [lastUpdate, setLastUpdate] = useState();

    function formatLastUpdateDate()
    {
        var date = new Date();
        setLastUpdate(`${date.toLocaleDateString()} ${date.toLocaleTimeString()}`);
    }

    return [lastUpdate, formatLastUpdateDate];
};


export default function DataReader({ id, title, isTemp }) 
{
    // Default useState
    const [dataFromJeedomApi, setDataFromJeedomApi] = useState('');
    const [error, setError] = useState('');
    
    // Custom Hook
    const [temperatureClass, setTemperatureClass] = useTemperature(0);
    const [lastUpdate, setLastUpdate] = useLastUpdate();


    const processFetchedDataFromJeedomApi = (data) => 
    {
        setError('');
        setDataFromJeedomApi(data);
        if(isTemp) setTemperatureClass(data);
        setLastUpdate();
    };


    useEffect(() => 
    {
        const fetchJeedomApiData = async () => 
        {
            // eslint-disable-next-line no-undef
            fetch(`${process.env.REACT_APP_JEEDOM_URL}&type=cmd&id=${id}`)
                .then((response) => response.text())
                .then((dataFromJeedomApi) => processFetchedDataFromJeedomApi(dataFromJeedomApi))
                .catch((error) => setError(error));
        };

        fetchJeedomApiData();

        setInterval(fetchJeedomApiData, 15000);
    }, []);


    if (error !== '') 
    {
        return <div>Erreur {error}</div>;
    }
    
    
    return (
        <div className={isTemp ? 'card ' + temperatureClass : 'card'}>
            <h2>{title}</h2>
            <div className="card-dataFromJeedomApi">{dataFromJeedomApi}</div>
            <div className="card-update">{lastUpdate}</div>
        </div>
    );
}