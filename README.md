# Jeedom Viewer
***This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app)***.

JeedomViewer for display status and informations from Jeedom API.

![screen](screen-1.png?raw=true)

First, we need to create a `.env` file with Jeedom API URL at the root

```
REACT_APP_JEEDOM_URL='https://myjeedom.com/core/api/jeeApi.php?apikey=xxxxxx'
```
Get command id from Jeedom
![screen-3](screen-2.png?raw=true)

Set command id in `App.jsx`
```javascript
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
```
Then we can run `npm install`

## New Server side
> Server side use a summary login system. Please change users names and passwords in **server/user.js**

Build app with `npm run build`

Run server with `node .\server\server.js`
## `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
