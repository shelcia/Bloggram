import { AppBar, Box, Divider, Toolbar } from "@mui/material";
import React, { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import CustomMenuList from "../components/CustomMenuList";
import MenuIcon from "@mui/icons-material/Menu";
import CustomPopover from "../components/CustomPopover";
import { ThemeContext } from "../context/ThemeContext";
import ThemeToggler from "../components/ThemeToggler";
import {
  CustomMenuItm,
  CustomMenuLink,
  CustomMenuLogoLink,
} from "../components/CustomComponents";
import { PREFIX } from "../constants";

const DashboardLayout = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const uname = localStorage.getItem(`${PREFIX}uname`);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
    setAnchorEl(null);
  };

  const menuItems = [
    {
      name: "Write",
      link: "/add-blog",
    },
    {
      name: "Dashboard",
      link: "/dashboard",
    },
    {
      name: "Profile",
      link: `/profile/${uname}`,
    },
  ];

  const [darkTheme] = useContext(ThemeContext);

  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          color="transparent"
          sx={{
            boxShadow: "none",
            borderBottom: darkTheme
              ? "1px solid hsla(0,0%,100%,.2)"
              : "1px solid rgba(0,0,0,.6)",
          }}
          className="dashboard-topmenu"
        >
          <Toolbar className="d-flex flex-row justify-content-between pe-0">
            <CustomMenuLogoLink />
            <Box className="d-flex flex-row topmenu-items">
              <Box
                sx={{
                  borderLeft: darkTheme
                    ? "1px solid hsla(0,0%,100%,.2)"
                    : "1px solid rgba(0,0,0,.6)",
                  height: 64,
                }}
                className="d-flex flex-row align-items-center menu-item"
              >
                <ThemeToggler />
              </Box>
              {menuItems.map((itm) => (
                <CustomMenuLink
                  key={itm.name}
                  name={itm.name}
                  link={itm.link}
                />
              ))}
              <CustomMenuItm name="Logout" onclick={() => logout()} />
              <Box
                sx={{
                  borderLeft: darkTheme
                    ? "1px solid hsla(0,0%,100%,.2)"
                    : "1px solid rgba(0,0,0,.6)",
                  height: 64,
                }}
                className="d-flex flex-row align-items-center toggle-icon"
                onClick={handleClick}
              >
                <MenuIcon />
              </Box>
            </Box>
            <CustomPopover anchorEl={anchorEl} setAnchorEl={setAnchorEl}>
              <>
                <CustomMenuList onClick={() => setAnchorEl(null)}>
                  <ThemeToggler />
                </CustomMenuList>

                {menuItems.map((itm) => (
                  <CustomMenuList
                    onClick={() => {
                      navigate(itm.link);
                      setAnchorEl(null);
                    }}
                    key={itm.name}
                  >
                    {itm.name}
                  </CustomMenuList>
                ))}
                <Divider />
                <CustomMenuList onClick={logout}>Logout</CustomMenuList>
              </>
            </CustomPopover>
          </Toolbar>
        </AppBar>
      </Box>
      <Outlet />
    </React.Fragment>
  );
};

export default DashboardLayout;
