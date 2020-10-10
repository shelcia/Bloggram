import React from 'react';
import './styles/style.css';

import LandinPage from "./components/LandingPage/LandingPage";
import Login from "./components/Login/Login";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={LandinPage}/> 
        <Route path="/login" exact component={Login}/> 
      </Switch>
    </Router>
  );
}

export default App;
