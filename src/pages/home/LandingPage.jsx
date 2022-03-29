import React from "react";
import { Circle } from "react-awesome-shapes/dist/shapes/circle";
// import { CircleGrid } from "react-awesome-shapes/dist/shapes/circlegrid";
import { Diamond } from "react-awesome-shapes/dist/shapes/diamond";
import { Donut } from "react-awesome-shapes/dist/shapes/donut";
import Footer from "../common/Footer";
import Blogs from "./components/Blogs";
import Hero from "./components/Hero";
import Topbar from "./components/Topbar";

const LandingPage = () => {
  return (
    <React.Fragment>
      <Donut
        color="#24EFC8"
        size="180px"
        width={["40px", "40px", "60px", "60px"]}
        top="130px"
        left="-20px"
      />
      <Diamond
        color="linear-gradient(135deg, #6FB3FF, #2499EF)"
        size="100px"
        right="0"
        top="50px"
      />
      <Circle
        color="linear-gradient(135deg, #24EFC8, #24D0EF)"
        size={["150px", "150px", "180px", "180px"]}
        top="200px"
        right="70px"
      />
      <Topbar />
      <Hero />
      <Blogs />
      <Footer />
    </React.Fragment>
  );
};

export default LandingPage;
