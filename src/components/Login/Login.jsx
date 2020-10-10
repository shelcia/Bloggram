import React from 'react';
import BlogLogin from "../../assets/bloglogin.png"

const Login = ()=>{
    return(
        <React.Fragment>
            <div className="container border" style={{marginTop:"2rem"}}>
                <div className="row">
                <div className="col-sm-6">
                    <img src={BlogLogin} alt="blog" className="img-fluid"/>
                </div>
                <div className="col-sm-6">
                  <form action="/action_page.php" class="was-validated">
                    <div className="form-group">
                      <label htmlFor="uname">Username:</label>
                        <input type="text" className="form-control" id="uname" placeholder="Enter username" name="uname" required />
                          <div className="valid-feedback">Valid.</div>
                          <div className="invalid-feedback">Please fill out this field.</div>
                          </div>
                        <div className="form-group">
                        <label htmlFor="pwd">Password:</label>
                        <input type="password" className="form-control" id="pwd" placeholder="Enter password" name="pswd" required />
                          <div className="valid-feedback">Valid.</div>
                          <div className="invalid-feedback">Please fill out this field.</div>
                        </div>
      
                      <button type="submit" class="btn btn-primary">Submit</button>
                  </form>
                </div>
                </div>
                
            </div>
        </React.Fragment>
    )
}

export default Login;