import React from "react";
import Footer from "../common/Footer";
import { LandingPageShapes } from "../common/Shapes";
import Blogs from "./components/Blogs";
import Hero from "./components/Hero";
import Topbar from "./components/Topbar";

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
