import React, { useContext } from "react";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { ThemeContext } from "../context/ThemeContext";
import { Box } from "@mui/material";

const ThemeToggler = () => {
  const [darkTheme, setDarkTheme] = useContext(ThemeContext);
  return (
    <Box>
      {darkTheme ? (
        <LightModeIcon
          onClick={() => {
            setDarkTheme(!darkTheme);
            localStorage.setItem("bloggram-theme", false);
          }}
        />
      ) : (
        <DarkModeIcon
          onClick={() => {
            setDarkTheme(!darkTheme);
            localStorage.setItem("bloggram-theme", true);
          }}
        />
      )}
    </Box>
  );
};

export default ThemeToggler;
