/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import './DataReader.css'
import { getFormatedDateTime } from '../../DateFormat'

export const getTemperatureClass = (temperature) => {
  let temperatureClass = 'good'
  if (temperature < 18) temperatureClass = 'cold'
  if (temperature > 23) temperatureClass = 'hot'
  return temperatureClass
}

export function DataReader ({ commandId, title, isTemp }) {
  // Default useState
  const refreshInterval = 30000
  const [dataFromJeedomApi, setDataFromJeedomApi] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [lastUpdate, setLastUpdate] = useState(getFormatedDateTime())

  const fetchDataFromJeedomApi = async () => {
    // eslint-disable-next-line no-undef
    fetch('/api/jeedomdata/' + commandId)
      .then((response) => response.json())
      .then((dataFromJeedomApi) => onSuccessFetchedDataFromJeedomApi(dataFromJeedomApi))
      .catch((error) => setErrorMessage('Erreur: ' + error))
  }

  const onSuccessFetchedDataFromJeedomApi = (data) => {
    setErrorMessage('')
    setDataFromJeedomApi(data)
    setLastUpdate(getFormatedDateTime())
  }

  useEffect(() => {
    // Don’t wait the first setTimeout for fetch
    if (dataFromJeedomApi === '') fetchDataFromJeedomApi()

    const timeout = setTimeout(() => {
      fetchDataFromJeedomApi()
    }, refreshInterval)

    return () => clearTimeout(timeout)
  })

  if (errorMessage !== '') {
    return <div>Erreur {errorMessage}</div>
  }

  return (
        <div className={isTemp ? 'card ' + getTemperatureClass(dataFromJeedomApi) : 'card infos'}>
            <h2>{title}</h2>
            <div className="card-data">{dataFromJeedomApi}</div>
            <div className="card-update">{lastUpdate}</div>
        </div>
  )
}
