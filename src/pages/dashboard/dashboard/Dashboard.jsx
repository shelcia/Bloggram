import React from "react";
import { Fab, Tooltip } from "@mui/material";
import MyBlogs from "../components/MyBlogs";
import { useNavigate } from "react-router-dom";
import { DashboardShapes } from "../../../components/Shapes";
import EditIcon from "@mui/icons-material/Edit";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <>
      <DashboardShapes />
      <section className="container p-5">
        <div className="row">
          <div className="col-md-12">
            <h2 className="display-3 text" style={{ fontWeight: 600 }}>
              Write Something Today !
            </h2>
            {/* <div className="text-center my-3">
              <Button
                color="primary"
                onClick={() => navigate("/dashboard/add-blog")}
              >
                Start Writing..
              </Button>
            </div> */}
            <MyBlogs />
          </div>
        </div>
      </section>
      <div style={editstyle}>
        <Tooltip title="Start Writing Blog Now">
          <Fab
            color="primary"
            aria-label="add"
            onClick={() => navigate("/dashboard/add-blog")}
            variant="extended"
          >
            <EditIcon sx={{ mr: 1 }} /> Write
          </Fab>
        </Tooltip>
      </div>
    </>
  );
};

export default Dashboard;

const editstyle = {
  margin: 0,
  top: "auto",
  transform: "translateX(50%)",
  bottom: 20,
  right: 100,
  left: "auto",
  position: "fixed",
};
