import { Box, Typography } from "@mui/material";
import React from "react";
// import SearchInput from "../../../components/SearchInput";

const Hero = () => {
  //   const gotoBlog = () => {
  //     if (window)
  //       window.scrollTo({
  //         top:
  //           document.getElementById("blog-content").getBoundingClientRect().top +
  //           window.pageYOffset -
  //           50,
  //         behavior: "smooth",
  //       });
  //   };

  return (
    <React.Fragment>
      <Box className="container pt-5">
        <Typography
          component="h1"
          className="display-3 mb-5 mt-4"
          style={{ fontWeight: 600 }}
          // data-aos="fade-up"
        >
          Write Passionate Blogs about Everything
          {/* Tech , Design, Art, Cinema and much more */}
        </Typography>
        {/* <div className="text-center mt-3">
          <SearchInput />
        </div> */}
      </Box>
    </React.Fragment>
  );
};

export default Hero;
