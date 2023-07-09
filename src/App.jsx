import React, { useContext } from "react";
import "./styles/bootstrap/bootstrap.css";
import "./styles/style.css";

import routes from "./routes";
import { useRoutes } from "react-router-dom";
import { customTheme } from "./theme";
import {
  Box,
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";

import AOS from "aos";
import "aos/dist/aos.css";
import { Toaster } from "react-hot-toast";
import { ThemeContext } from "./context/ThemeContext";

AOS.init({
  // Global settings:
  disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
  startEvent: "DOMContentLoaded", // name of the event dispatched on the document, that AOS should initialize on
  initClassName: "aos-init", // class applied after initialization
  animatedClassName: "aos-animate", // class applied on animation
  useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
  disableMutationObserver: false, // disables automatic mutations' detections (advanced)
  debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
  throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 120, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 400, // values from 0 to 3000, with step 50ms
  easing: "ease", // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: "top-bottom", // defines which position of the element regarding to window should trigger the animation
});

const App = () => {
  const allPages = useRoutes(routes);

  const [darkTheme] = useContext(ThemeContext);

  const appTheme = customTheme({
    theme: darkTheme ? "dark" : "light",
    direction: "ltr",
    // responsiveFontSizes: settings.responsiveFontSizes
  }); // toaster options

  const toasterOptions = {
    style: {
      fontWeight: 500,
      fontFamily: "'Satoshi', sans-serif",
    },
  };

  return (
    <Box className={darkTheme ? `dark-theme` : `light-theme`}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={appTheme}>
          <CssBaseline />
          <Toaster toastOptions={toasterOptions} />
          {allPages}
        </ThemeProvider>
      </StyledEngineProvider>
    </Box>
  );
};

export default App;
