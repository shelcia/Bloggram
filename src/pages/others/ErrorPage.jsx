import React from "react";
import './ErrorPage.css'
import { Button } from "@mui/material";

const ErrorPage = () => {
  return (
    <>
      <div className="container">
        <div className="page">
          <h1>404</h1>
          <p>Page not found!</p>
           <a href="https://bloggram-beta.vercel.app/"><Button variant="contained">Go To Home</Button></a>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
