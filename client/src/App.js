import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import { verify } from 'jsonwebtoken';
import env from './.env';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

// components
import Construction from './components/Construction';
import Home from './components/Home';
import Challenge0 from './components/challenges/Challenge0';
import Challenge1 from './components/challenges/Challenge1';
import Challenge2 from './components/challenges/Challenge2';
import Challenge3 from './components/challenges/Challenge3';
import Challenge4 from './components/challenges/Challenge4';
import Challenge5 from './components/challenges/Challenge5';
import Navi from './components/Navi';

import {
  OffTopicForum,
  Challenge0Forum,
  Challenge1Forum,
  Challenge2Forum,
  Challenge3Forum,
  Challenge4Forum,
  Challenge5Forum,
  Challenge6Forum,
  Challenge7Forum,
  Challenge8Forum,
  Challenge9Forum,
  Challenge10Forum
} from './components/subforums/Forums';
import Login from './components/Login'



function App(props) {
  
  // sets routes based on login authentication
  function setConditionals() {

    const { token } = localStorage;
    try { 
      verify(token, env.jwtseed);
      return [
        <Redirect key="loginRedirect" from='/Login' to='/Home' />,
      ];
    }
    catch(e) { 
      return [
        <Route key="LoginRoute" exact path='/Login' component={Login} />, 
      ];
    }
  }

  return (
  	<div className="App">
		<Navi />
  		<Router>
  			<div>
  				<Switch>
            <Route exact path='/Home' component={Home} />
  					<Route exact path='/Construction' component={Construction}/>
  					<Route exact path='/Challenge0' component={Challenge0} />
            <Route exact path='/Challenge1' component={Challenge1} />
            <Route exact path='/Challenge2' component={Challenge2} />
            <Route exact path='/Challenge3' component={Challenge3} />
            <Route exact path='/Challenge4' component={Challenge4} />
            <Route exact path='/Challenge5' component={Challenge5} />

            <Route exact path='/OffTopic' component={OffTopicForum} />
            <Route exact path='/Challenge0Forum' component={Challenge0Forum} />
            <Route exact path='/Challenge1Forum' component={Challenge1Forum} />
            <Route exact path='/Challenge2Forum' component={Challenge2Forum} />
            <Route exact path='/Challenge3Forum' component={Challenge3Forum} />
            <Route exact path='/Challenge4Forum' component={Challenge4Forum} />
            <Route exact path='/Challenge5Forum' component={Challenge5Forum} />
            <Route exact path='/Challenge6Forum' component={Challenge6Forum} />
            <Route exact path='/Challenge7Forum' component={Challenge7Forum} />
            <Route exact path='/Challenge8Forum' component={Challenge8Forum} />
            <Route exact path='/Challenge9Forum' component={Challenge9Forum} />
            <Route exact path='/Challenge10Forum' component={Challenge10Forum} />

            {setConditionals()}
  					<Redirect to='/Construction'/>
  				</Switch>
  			</div>
  		</Router>
  	</div>
  );
}

export default App;
