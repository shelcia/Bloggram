import { Donut } from "react-awesome-shapes/dist/shapes/donut";
import { Diamond } from "react-awesome-shapes/dist/shapes/diamond";
import { Circle } from "react-awesome-shapes/dist/shapes/circle";
import { CircleGrid } from "react-awesome-shapes/dist/shapes/circlegrid";
import { SquareDonut } from "react-awesome-shapes/dist/shapes/squareDonut";

export const LandingPageShapes = () => (
  <>
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
  </>
);

export const AuthShapes = () => (
  <>
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
    <CircleGrid color="#24D0EF" size="175px" top="40px" left="200px" />
  </>
);

export const DashboardShapes = () => (
  <>
    <Donut
      color="#24EFC8"
      size="180px"
      width={["40px", "40px", "60px", "60px"]}
      top="130px"
      left="-50px"
    />
    <Diamond
      color="linear-gradient(135deg, #6FB3FF, #2499EF)"
      size="100px"
      right="0"
      top="50px"
    />
    <CircleGrid color="#24D0EF" size="175px" bottom="30px" right="-65px" />
  </>
);

export const BlogShapes = () => (
  <>
    <Donut
      color="#24EFC8"
      size="180px"
      width={["40px", "40px", "60px", "60px"]}
      top="130px"
      left="-50px"
    />
    <Diamond
      color="linear-gradient(135deg, #6FB3FF, #2499EF)"
      size="100px"
      right="0"
      top="50px"
    />
    <CircleGrid color="#24D0EF" size="175px" bottom="30px" right="-65px" />
  </>
);

export const ViewBlogShapes = () => (
  <>
    <Donut
      color="#24EFC8"
      size="180px"
      width={["40px", "40px", "60px", "60px"]}
      top="130px"
      left="-50px"
    />
    <SquareDonut size="150px" color="#24D0EF" bottom="30px" right="-45px" />
  </>
);
