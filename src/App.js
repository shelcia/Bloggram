import React from 'react';
import './styles/style.css';

import LandinPage from "./components/LandingPage/LandingPage";
import Login from "./components/Login/Login";
import Signup from "./components/Login/Signup";
import BlogsPage from "./components/LandingPage/Blog";
import Feed from "./components/HomePage/Feed";
import MyBlog from "./components/HomePage/MyBlogs";
import MyProfile from "./components/HomePage/MyProfile";
import AddNewBlog from "./components/HomePage/AddNewBlog.jsx";
import Blog from "./components/Blogs/Blogs";
import BlogEdit from "./components/Blogs/EditBlog";
import CategoryPage from "./components/LandingPage/CategoriesPage";
import SubCategoryPage from "./components/LandingPage/SubCategoris";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={LandinPage}/> 
        <Route path="/login" exact component={Login}/> 
        <Route path="/signup" exact component={Signup}/> 
        <Route path="/blog" exact component={BlogsPage}/> 
        <Route path="/blog/:id" component={Blog}/> 
        <Route path="/category" exact component={CategoryPage}/> 
        <Route path="/category/:id" component={SubCategoryPage}/> 
        <Route path="/dashboard/feed" exact component={Feed}/> 
        <Route path="/dashboard/myblogs" exact component={MyBlog}/> 
        <Route path="/dashboard/myblogs/edit/:id" component={BlogEdit}/> 
        <Route path="/dashboard/myblogs/newblog" exact component={AddNewBlog}/> 
        <Route path="/dashboard/myprofile" exact component={MyProfile}/> 
      </Switch>
    </Router>
  );
}

export default App;
