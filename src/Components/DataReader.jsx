/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import './DataReader.css';

//Custom hooks
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

//--------------------------------------------------------

export default function DataReader({ id, title, isTemp }) 
{
    // Default useState
    const [dataFromJeedomApi, setDataFromJeedomApi] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [fetchJeedomApiDataOnceAtStart, setFetchJeedomApiDataAtStart] = useState(true);
    
    // Custom Hook
    const [temperatureClass, setTemperatureClass] = useTemperature(0);
    const [lastUpdate, setLastUpdate] = useLastUpdate();


    const processFetchedDataFromJeedomApi = (success, data) => 
    {
        if(success === false)
        {
            setErrorMessage(data);
            return;
        }
        else
        {
            setErrorMessage('');
            setDataFromJeedomApi(data);
            if(isTemp) setTemperatureClass(data);
            setLastUpdate();
        }
    };


    const fetchJeedomApiData = async () => 
    {
        // eslint-disable-next-line no-undef
        fetch(`${process.env.REACT_APP_JEEDOM_URL}&type=cmd&id=${id}`)
            .then((response) => response.text())
            .then((dataFromJeedomApi) => processFetchedDataFromJeedomApi(true, dataFromJeedomApi))
            .catch((error) => processFetchedDataFromJeedomApi(false, error));
    };

    
    useEffect(() => 
    {
        if(fetchJeedomApiDataOnceAtStart)
        {
            fetchJeedomApiData();
            setFetchJeedomApiDataAtStart(false);
        }

        const fetchInterval = setInterval(()=>
        {
            fetchJeedomApiData();
        }, 15000);

        return () =>
        {   
            clearInterval(fetchInterval);
        };
    },[]);


    if (errorMessage !== '') 
    {
        return <div>Erreur {errorMessage}</div>;
    }
    

    return (
        <div className={isTemp ? 'card ' + temperatureClass : 'card'}>
            <h2>{title}</h2>
            <div className="card-data">{dataFromJeedomApi}</div>
            <div className="card-update">{lastUpdate}</div>

            <button onClick={fetchJeedomApiData}>Refresh</button>
        </div>
    );
}