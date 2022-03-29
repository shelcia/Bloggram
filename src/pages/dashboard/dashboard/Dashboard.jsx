import React from "react";
import { Button } from "@mui/material";
import MyBlogs from "../components/MyBlogs";

const Dashboard = () => {
  return (
    <section className="container p-5">
      <div className="row">
        <div className="col-md-8">
          <h2 className="display-3 text">Write Something Today !</h2>
          <div className="text-center my-3">
            <Button color="primary">Start Writing..</Button>
          </div>
          <MyBlogs />
        </div>
        <div
          className="col-md-4"
          style={{ borderLeft: "1px solid #dadada", minHeight: "80vh" }}
        >
          <h4 className="text">Recommeded !</h4>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
