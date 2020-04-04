import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

// components
import Construction from './components/Construction';
import Home from './components/Home';
import Challenge0 from './components/challenges/Challenge0';
import Victory0 from './components/challenges/Victory0';
import Challenge1 from './components/challenges/Challenge1';
import Victory1 from './components/challenges/Victory1';
import Challenge2 from './components/challenges/Challenge2';
import Victory2 from './components/challenges/Victory2';
import Navi from './components/Navi';
import Directory from './components/Directory';
import Login from './components/Login'

// redux
import { connect } from 'react-redux';


function App(props) {
  console.log(props);

  function setLogin() {
    if(props.user === '')
      return <Route exact path='/Login' component={Login} />
    else
      return <Redirect from='/Login' to='/home' />
  }

  return (
  	<div className="App">
		<Navi />
  		<Router>
  			<div>
  				<Switch>
  					<Route exact path='/Construction' component={Construction}/>
  					<Route exact path='/Challenge0' component={Challenge0} />
  					<Route exact path='/Victory0' component={Victory0} />
            <Route exact path='/Challenge1' component={Challenge1} />
            <Route exact path='/Victory1' component={Victory1} />
            <Route exact path='/Challenge2' component={Challenge2} />
            <Route exact path='/Victory2' component={Victory2} />
            <Route exact path='/Forums' component={Directory} />
            {setLogin()}
  					<Redirect to='/Construction'/>
  				</Switch>
  			</div>
  		</Router>
  	</div>
  );
}

const mapStatesToProps = state => ({user: state.account.user});
export default connect(mapStatesToProps)(App);
