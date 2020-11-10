import React from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const Loading = ({ text }) => {
  return (
    <div
      className="w-100 h-100 d-flex"
      style={{ alignItems: "center", justifyContent: "center" }}
    >
      <Loader
        type="Hearts"
        color="#000000"
        className="img-fluid"
        height={300}
        width={300}
        timeout={3000}
      >
        <h6>{text}</h6>
      </Loader>
    </div>
  );
};

export default Loading;
