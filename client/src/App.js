import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import Construction from './components/Construction';
import Home from './components/Home';
import Challenge0 from './components/challenges/Challenge0';
import Victory0 from './components/challenges/Victory0';
import Navi from './components/Navi';

function App() {
  return (
  	<div className="App">
		<Navi />
  		<Router>
  			<div>
  				<Switch>
  					<Route path='/Construction' component={Construction}/>
  					<Route path='/Challenge0' component={Challenge0} />
  					<Route path='/Victory0' component={Victory0} />
  					<Redirect to='/Construction'/>
  				</Switch>
  			</div>
  		</Router>
  	</div>
  );
}

export default App;
