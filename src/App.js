import React from 'react';
import './styles/style.css';

import LandinPage from "./components/LandingPage/LandingPage";
import Login from "./components/Login/Login";
import Signup from "./components/Login/Signup";
import Blogs from "./components/LandingPage/Blog";
import Feed from "./components/HomePage/Feed";
import MyBlog from "./components/HomePage/MyBlogs";
import MyProfile from "./components/HomePage/MyProfile";


import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={LandinPage}/> 
        <Route path="/login" exact component={Login}/> 
        <Route path="/signup" exact component={Signup}/> 
         <Route path="/blog" exact component={Blogs}/> 
         <Route path="/dashboard/feed" exact component={Feed}/> 
         <Route path="/dashboard/myblogs" exact component={MyBlog}/> 
         <Route path="/dashboard/myprofile" exact component={MyProfile}/> 
      </Switch>
    </Router>
  );
}

export default App;
