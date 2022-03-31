import {
  AppBar,
  Box,
  Divider,
  Popover,
  Toolbar,
  Typography,
  Avatar,
} from "@mui/material";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import CustomMenuList from "../pages/common/CustomMenuList";

const DashboardLayout = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

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
              <Avatar
                src="/broken-image.jpg"
                aria-describedby={id}
                onClick={handleClick}
                sx={{ width: 30, height: 30 }}
              />
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                PaperProps={{
                  sx: {
                    minWidth: 160,
                    maxWidth: 230 || 375,
                    width: "100%",
                    padding: "0.5rem 0",
                  },
                }}
              >
                <div>
                  <CustomMenuList
                    onClick={() => navigate("/dashboard/profile")}
                  >
                    Profile
                  </CustomMenuList>
                  <Divider />
                  <CustomMenuList onClick={logout}>Logout</CustomMenuList>
                </div>
              </Popover>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
      <Outlet />
    </React.Fragment>
  );
};

export default DashboardLayout;
