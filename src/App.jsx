import React from 'react';
import './App.css';

import DataReader from './Components/DataReader';

function App() 
{
    return (
        <div className="App">
            <DataReader title="Mode" commandId="266" />
            <DataReader title="Température bureau" commandId="640" isTemp={true}/>
            <DataReader title="Température étage" commandId="432" isTemp={true}/>
            <DataReader title="Température RDC" commandId="431" isTemp={true}/>
        </div>
    );
}

export default App;
