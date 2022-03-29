import { Button } from "@mui/material";
import React from "react";

const Hero = () => {
  const gotoBlog = () => {
    if (window)
      window.scrollTo({
        top:
          document.getElementById("blog-content").getBoundingClientRect().top +
          window.pageYOffset -
          50,
        behavior: "smooth",
      });
  };

  return (
    <React.Fragment>
      <section className="container p-5" style={{ height: "90vh" }}>
        <h1
          className="display-2 text mt-5"
          style={{ fontWeight: 600 }}
          data-aos="fade-up"
        >
          Write Passionate Blogs about Tech, Design, Art, Cinema and much more
        </h1>
        <div className="text-center mt-3">
          <Button variant="outlined" size="large" onClick={gotoBlog}>
            Read More
          </Button>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Hero;
