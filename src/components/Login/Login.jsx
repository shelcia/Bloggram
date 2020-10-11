import React from 'react';
import BlogLogin from "../../assets/bloglogin.png"
import { Link } from "react-router-dom";
import Navbar from "../LandingPage/Navbar";

const Login = () => {
  return (
    <React.Fragment>
      <Navbar/>
      <div className="container" id="container">
        <div className="row">
          <div className="col-sm-6">
            <img src={BlogLogin} alt="blog" className="img-fluid" />
          </div>
          <div className="col-sm-6">
            <h3 className="text-center">Login</h3>
            <form className="was-validated">
              <div className="form-group">
                <label htmlFor="uname">Email:</label>
                <input type="email" className="form-control" id="uname" placeholder="Enter username" name="uname" required />
                <div className="invalid-feedback">Please enter valid email.</div>
              </div>
              <div className="form-group">
                <label htmlFor="pwd">Password:</label>
                <input type="password" className="form-control" id="pwd" placeholder="Enter password" name="pswd" required />
                <div className="invalid-feedback">Please fill out this field.</div>
              </div>
              <div className="text-center">
              <button type="submit" class="btn btn-primary">Submit</button>
              </div>
            </form>
            <div className="text-center">
                Don't have an account? then  <Link to="/signup">Signup</Link>
            </div>  
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Login;