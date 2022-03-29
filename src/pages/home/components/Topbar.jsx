import React from "react";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          color="transparent"
          sx={{ boxShadow: "none" }}
        >
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Bloggram
            </Typography>
            <div>
              <Button color="inherit" onClick={() => navigate("/signin")}>
                Register
              </Button>
              <Button color="inherit" onClick={() => navigate("/login")}>
                Login
              </Button>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
    </React.Fragment>
  );
};

export default Topbar;
