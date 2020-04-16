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
import Victory0 from './components/challenges/Victory0';
import Challenge1 from './components/challenges/Challenge1';
import Victory1 from './components/challenges/Victory1';
import Challenge2 from './components/challenges/Challenge2';
import Victory2 from './components/challenges/Victory2';
import Challenge3 from './components/challenges/Challenge3';
import Victory3 from './components/challenges/Victory3';
import Navi from './components/Navi';
import OffTopic from './components/subforums/OffTopic';
import Challenge0Forum from './components/subforums/Challenge0Forum';
import Challenge1Forum from './components/subforums/Challenge1Forum';
import Challenge2Forum from './components/subforums/Challenge2Forum';
import Login from './components/Login'
import CreatePost from './components/CreatePost';



function App(props) {
  
  // sets routes based on login authentication
  function setConditionals() {

    const { token, user} = localStorage;
    // need keys because arrays are rendered as lists
    try { 
      verify(token, user + env.jwtseed);
      return [
        <Redirect key="loginRedirect" from='/Login' to='/Home' />,
        <Route key="createPostRoute" exact path='/CreatePost' component={CreatePost} />
      ];
    }
    catch(e) { 
      return [
        <Route key="LoginRoute" exact path='/Login' component={Login} />, 
        <Redirect key="createPostRedirect" from='/CreatePost' to='/Home' />
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
  					<Route exact path='/Victory0' component={Victory0} />
            <Route exact path='/Challenge1' component={Challenge1} />
            <Route exact path='/Victory1' component={Victory1} />
            <Route exact path='/Challenge2' component={Challenge2} />
            <Route exact path='/Victory2' component={Victory2} />
            <Route exact path='/Challenge3' component={Challenge3} />
            <Route exact path='/Victory3' component={Victory3} />

            <Route exact path='/OffTopic' component={OffTopic} />
            <Route exact path='/Challenge0Forum' component={Challenge0Forum} />
            <Route exact path='/Challenge1Forum' component={Challenge1Forum} />
            <Route exact path='/Challenge2Forum' component={Challenge2Forum} />
            {setConditionals()}
  					<Redirect to='/Construction'/>
  				</Switch>
  			</div>
  		</Router>
  	</div>
  );
}

export default App;
