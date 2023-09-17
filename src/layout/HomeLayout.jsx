import React, { useContext } from "react";
import { AppBar, Box, Toolbar } from "@mui/material";
import {
  CustomMenuLink,
  CustomMenuLogoLink,
} from "../components/CustomComponents";
import { ThemeContext } from "../context/ThemeContext";
import ThemeToggler from "../components/ThemeToggler";
import { Outlet, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CustomPopover from "../components/CustomPopover";
import CustomMenuList from "../components/CustomMenuList";
import Footer from "../common/Footer";

const HomeLayout = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const [darkTheme] = useContext(ThemeContext);

  const navigate = useNavigate();

  const menuItems = [
    // {
    //   name: "Search",
    //   onclick: () => navigate("/"),
    //   link: "/",
    // },
    {
      name: "Get started",
      onclick: () => navigate("/signup"),
      link: "/signup",
    },
    // {
    //   name: "Login",
    //   onclick: () => navigate("/login"),
    //   link: "/login",
    // },
  ];

  return (
    <>
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
          className="dashboard-topmenu pe-0"
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
              </>
            </CustomPopover>
          </Toolbar>
        </AppBar>
      </Box>
      <Outlet />
      <Footer />
    </>
  );
};

export default HomeLayout;
