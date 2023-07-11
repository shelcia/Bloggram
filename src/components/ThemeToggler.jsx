import React, { useContext } from "react";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { ThemeContext } from "../context/ThemeContext";
import { Box } from "@mui/material";
import { PREFIX } from "../constants";

const ThemeToggler = () => {
  const [darkTheme, setDarkTheme] = useContext(ThemeContext);
  return (
    <Box>
      {darkTheme ? (
        <LightModeIcon
          onClick={() => {
            setDarkTheme(!darkTheme);
            localStorage.setItem(`${PREFIX}theme`, false);
          }}
        />
      ) : (
        <DarkModeIcon
          onClick={() => {
            setDarkTheme(!darkTheme);
            localStorage.setItem(`${PREFIX}theme`, true);
          }}
        />
      )}
    </Box>
  );
};

export default ThemeToggler;
