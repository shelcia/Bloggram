import React , { useRef, useState } from 'react';
import BlogLogin from "../../assets/bloglogin.png"
import { Link, useHistory } from "react-router-dom";
import Navbar from "../LandingPage/Navbar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../Loading";

const Login = () => {

  const email = useRef("");
  const password = useRef("");
  const LINK = process.env.REACT_APP_HEROKU_LINK;
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const PREFIX = "BlogGram-";

  const sucessNotify = (message) => {
    toast.success(message);
  };
  const failedNotify = (message) => {
    toast.error(message);
  };

    const onSubmit = (event) => {
    setIsLoading(true);
    localStorage.setItem(`${PREFIX}Email`, email.current.value);
    event.preventDefault();
    axios
      .post(`${LINK}signin`, {
        email: email.current.value,
        password: password.current.value,
      })
      .then((res) => {
        // console.log(res);
        setIsLoading(false);
        localStorage.setItem(`${PREFIX}Token`, res.data.token);
        localStorage.setItem(`${PREFIX}UserId`, res.data.userId);
        localStorage.setItem(`${PREFIX}name`, res.data.name);
        sucessNotify("Login succesfulll");
        history.push("/dashboard/feed");
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        failedNotify("Incorrect Credentials");
      });
  };

  return (
    <React.Fragment>
      {isLoading ? <Loading/> : <React.Fragment> 
         <ToastContainer/>
      <Navbar/>
      <div className="container" id="container">
        <div className="row">
          <div className="col-sm-6">
            <img src={BlogLogin} alt="blog" className="img-fluid" />
          </div>
          <div className="col-sm-6">
            <h3 className="text-center">Login</h3>
            <form className="was-validated" onSubmit={onSubmit}>
              <div className="form-group">
                <label htmlFor="uname">Email:</label>
                <input type="email" ref={email} className="form-control" id="uname" placeholder="Enter email" name="uname" required />
                <div className="invalid-feedback">Please enter valid email.</div>
              </div>
              <div className="form-group">
                <label htmlFor="pwd">Password:</label>
                <input type="password" ref={password} className="form-control" id="pwd" placeholder="Enter password" name="pswd" required />
                <div className="invalid-feedback">Please fill out this field.</div>
              </div>
              <div className="text-center">
              <button type="submit" className="btn btn-primary">Submit</button>
              </div>
            </form>
            <div className="text-center mt-5">
                Don't have an account? then  <Link to="/signup">Signup</Link>
            </div>  
          </div>
        </div>
      </div>
        </React.Fragment>}
    </React.Fragment>
  )
}

export default Login;