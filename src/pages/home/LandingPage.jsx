import React from "react";
import { LandingPageShapes } from "../../components/Shapes";
import Blogs from "./components/Blogs";
import Hero from "./components/Hero";
import Topbar from "./components/Topbar";
import Footer from "../../components/Footer";

const LandingPage = () => {
  return (
    <React.Fragment>
      <LandingPageShapes />
      <Topbar />
      <Hero />
      <Blogs />
      <Footer />
    </React.Fragment>
  );
};

export default LandingPage;
