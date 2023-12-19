import React from "react";
import './ErrorPage.css'

const ErrorPage = () => {
  return (
    <>
      <div className="container">
        <div className="page">
          <h1>404</h1>
          <p>Page not found!</p>
           <a href="https://bloggram-beta.vercel.app/"><button>Go to Home</button></a>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
