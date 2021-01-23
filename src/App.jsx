import React from 'react'
import './App.css';
import {Route, Switch} from 'react-router-dom'
import Wrapper from './Components/Wrapper/Wrapper';
import WeatherDetails from './Components/WeatherDetails/WeatherDetails'
function App() {

  
  return (
    <div className="App">
     <Switch>
      <Route path='/Details/:name' component={WeatherDetails}/>
      <Route path='/weather/' component={Wrapper}/>
      </Switch>
    </div>
  );
}

export default App;
