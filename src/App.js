import React from 'react';
import './styles/style.css';

import LandinPage from "./components/LandingPage/LandingPage";
import Login from "./components/Login/Login";
import Signup from "./components/Login/Signup";
import Blogs from "./components/LandingPage/Blog";
import Dashboard from "./components/HomePage/Dashboard";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={LandinPage}/> 
        <Route path="/login" exact component={Login}/> 
        <Route path="/signup" exact component={Signup}/> 
         <Route path="/blog" exact component={Blogs}/> 
         <Route path="/dashboard" exact component={Dashboard}/> 
      </Switch>
    </Router>
  );
}

export default App;
