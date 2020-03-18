import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import Home from './components/Home';
import Challenge0 from './components/challenges/Challenge0';
import Victory0 from './components/challenges/Victory0';

function App() {
  return (
  	<Router>
  		<div>
  			<Route path='/' component={Home} />
  			<Route path='/Challenge0' component={Challenge0} />
  			<Route path='/Victory0' component={Victory0} />
  		</div>
  	</Router>
  );
}

export default App;
