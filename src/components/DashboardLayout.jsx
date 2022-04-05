import {
  AppBar,
  Box,
  Divider,
  Toolbar,
  Typography,
  IconButton,
} from "@mui/material";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import CustomMenuList from "./CustomMenuList";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CustomPopover from "./Popover";

const DashboardLayout = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
    setAnchorEl(null);
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
              <IconButton onClick={handleClick}>
                <MoreVertIcon />
              </IconButton>
              <CustomPopover anchorEl={anchorEl} setAnchorEl={setAnchorEl}>
                <>
                  <CustomMenuList
                    onClick={() => {
                      navigate("/dashboard/profile");
                      setAnchorEl(null);
                    }}
                  >
                    Profile
                  </CustomMenuList>
                  <Divider />
                  <CustomMenuList onClick={logout}>Logout</CustomMenuList>
                </>
              </CustomPopover>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
      <Outlet />
    </React.Fragment>
  );
};

export default DashboardLayout;
