import React from "react";
import Blogs from "./components/Blogs";
import Hero from "./components/Hero";
// import Footer from "../../common/Footer";
import { Box, Button, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <Hero />
      <Divider />
      <Blogs />
      <Box className="text-center">
        <Button variant="contained" onClick={() => navigate("/signup")}>
          Start Reading Now !
        </Button>
      </Box>
      {/* <Footer /> */}
    </React.Fragment>
  );
};

export default LandingPage;
