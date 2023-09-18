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
      <Box className="text-center" sx={{ mt: { xs: 3, md: 0 } }}>
        <Button variant="contained" onClick={() => navigate("/signup")}>
          Start Reading Now !
        </Button>
      </Box>
    </React.Fragment>
  );
};

export default LandingPage;
