import React from 'react';
import Navbar from "../LandingPage/Navbar";


const Blog = () => {
  return (
    <React.Fragment>
    <Navbar/>
      <div className="container border" id="container">
        <form className="form-inline">
            <input type="type" className="form-control" placeholder="Search any Blog" id="blog" />
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
      <div className="container border mt-5">
        <div className="card-columns">
            <div className="card">
                <div className="car-body">
                    hi
                </div>
            </div>
             <div className="card">
                <div className="car-body">
                    hi
                </div>
            </div>
             <div className="card">
                <div className="car-body">
                    hi
                </div>
            </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Blog;