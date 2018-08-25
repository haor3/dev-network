import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Landing from './components/layout/Landing'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Dashboard from './components/layout/Dashboard'
import PrivateRoute from './components/PrivateRoute'
import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import { setCurrentUser, logoutUser } from './actions/user.actions'
import {clearProfile} from './actions/profile.actions'
import store from './store'

import './App.css';
 
if(localStorage.jwtToken){
  // set Auth token header 
  setAuthToken(localStorage.jwtToken)
  // decode token to get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken)
  // set user isAuthentiated
  store.dispatch(setCurrentUser(decoded))
  // check for expired token
  const currentTime = Date.now()/1000
  if(decoded.exp < currentTime){
    // log out user
    store.dispatch(logoutUser())
    // clear the user profile
    store.dispatch(clearProfile())
  }
}



class App extends Component {
  render() {
    return (
      <Router>
        <div className="App"> 
          <Navbar />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </div>
          <Switch>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
