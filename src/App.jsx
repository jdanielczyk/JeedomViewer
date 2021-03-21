import React from 'react';
import './App.css';

import DataReader from './Components/DataReader';

function App() 
{
    return (
        <div className="App">
            <DataReader title="Mode" id="266" />
            <DataReader title="Température bureau" id="640" isTemp={true}/>
            <DataReader title="Température étage" id="432" isTemp={true}/>
            <DataReader title="Température RDC" id="431" isTemp={true}/>
        </div>
    );
}

export default App;
