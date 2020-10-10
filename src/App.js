import React from 'react';
import './styles/style.css';

import LandinPage from "./components/LandingPage/LandingPage";
import Login from "./components/Login/Login";
import Signup from "./components/Login/Signup";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={LandinPage}/> 
        <Route path="/login" exact component={Login}/> 
        <Route path="/signup" exact component={Signup}/> 
      </Switch>
    </Router>
  );
}

export default App;
