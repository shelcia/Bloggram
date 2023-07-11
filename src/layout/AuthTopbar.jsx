import React, { useContext } from "react";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import ThemeToggler from "../components/ThemeToggler";
import { ThemeContext } from "../context/ThemeContext";
import { CustomMenuLogoLink } from "../components/CustomComponents";

const AuthTopbar = () => {
  const navigate = useNavigate();

  const [darkTheme] = useContext(ThemeContext);

  const menuItems = [
    {
      name: "Search",
      onclick: () => navigate("/"),
      link: "/",
    },
    {
      name: "Register",
      onclick: () => navigate("/signup"),
      link: "/signup",
    },
    {
      name: "Login",
      onclick: () => navigate("/login"),
      link: "/login",
    },
  ];

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
                <Box
                  sx={{
                    borderLeft: darkTheme
                      ? "1px solid hsla(0,0%,100%,.2)"
                      : "1px solid rgba(0,0,0,.6)",
                    height: 64,
                  }}
                  className="d-flex align-items-center menu-item"
                  key={itm.name}
                  onClick={itm.onclick}
                  component={NavLink}
                  to={itm.link}
                >
                  <Typography variant="h6" component="h2" sx={{ flexGrow: 1 }}>
                    {itm.name}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </React.Fragment>
  );
};

export default AuthTopbar;
