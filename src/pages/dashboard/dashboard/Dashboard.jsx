import React from "react";
import { Box, Divider, Fab, Tooltip, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MyBlogs from "../components/MyBlogs";
import EditIcon from "@mui/icons-material/Edit";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <>
      <section className="container pt-4">
        <Box className="row">
          <Box className="col-md-12">
            <Typography component="h1" variant="h2">
              Write Something Today !
            </Typography>
            <MyBlogs />
          </Box>
        </Box>
      </section>
      <Divider />
      <div style={editstyle}>
        <Tooltip title="Start Writing Blog Now">
          <Fab
            color="primary"
            aria-label="add"
            onClick={() => navigate("/dashboard/add-blog")}
            variant="extended"
            className="text-capitalize"
          >
            <EditIcon sx={{ mr: 1, fontSize: "1rem" }} /> Write
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
