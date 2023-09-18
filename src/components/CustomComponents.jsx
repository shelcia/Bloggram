import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import { ThemeContext } from "../context/ThemeContext";
import { NavLink } from "react-router-dom";

export const CustomMenuLink = ({ name, link }) => {
  const [darkTheme] = useContext(ThemeContext);
  return (
    <Box
      sx={{
        borderLeft: darkTheme
          ? "1px solid hsla(0,0%,100%,.2)"
          : "1px solid rgba(0,0,0,.6)",
        height: 64,
      }}
      className="d-flex align-items-center menu-item"
      key={name}
      component={NavLink}
      to={link}
      end
    >
      <Typography variant="h6" component="h2" sx={{ flexGrow: 1 }}>
        {name}
      </Typography>
    </Box>
  );
};

export const CustomMenuItm = ({ name, onclick = () => {} }) => {
  const [darkTheme] = useContext(ThemeContext);
  return (
    <Box
      sx={{
        borderLeft: darkTheme
          ? "1px solid hsla(0,0%,100%,.2)"
          : "1px solid rgba(0,0,0,.6)",
        height: 64,
      }}
      className="d-flex align-items-center menu-item"
      key={name}
      onClick={onclick}
    >
      <Typography variant="h6" component="h2" sx={{ flexGrow: 1 }}>
        {name}
      </Typography>
    </Box>
  );
};

export const CustomMenuLogoLink = () => {
  const [darkTheme] = useContext(ThemeContext);

  return (
    <Box
      sx={{
        borderRight: darkTheme
          ? "1px solid hsla(0,0%,100%,.2)"
          : "1px solid rgba(0,0,0,.6)",
        height: 64,
      }}
      className="d-flex align-items-center blog-menu"
      component={NavLink}
      to={"/"}
    >
      <Typography variant="h6" component="h1">
        Bloggram
      </Typography>
    </Box>
  );
};
