import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Divider, IconButton } from "@mui/material";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="container my-5">
      <Divider />
      <div className="d-flex justify-content-between align-items-center my-5 pb-5">
        <h6>
          Developed by {"  "}
          <Link to="https://www.shelcia-dev.me/">Shelcia</Link>
        </h6>
        <div>
          <Link to="https://github.com/shelcia">
            <IconButton aria-label="github">
              <GitHubIcon />
            </IconButton>
          </Link>
          <Link to="https://shelcia.medium.com/">
            <IconButton aria-label="medium">
              {/* Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 512 512"
                fill="currentColor"
                color="currentColor"
              >
                <path d="M71.5 142.3c.6-5.9-1.7-11.8-6.1-15.8L20.3 72.1V64h140.2l108.4 237.7L364.2 64h133.7v8.1l-38.6 37c-3.3 2.5-5 6.7-4.3 10.8v272c-.7 4.1 1 8.3 4.3 10.8l37.7 37v8.1H307.3v-8.1l39.1-37.9c3.8-3.8 3.8-5 3.8-10.8V171.2L241.5 447.1h-14.7L100.4 171.2v184.9c-1.1 7.8 1.5 15.6 7 21.2l50.8 61.6v8.1h-144v-8L65 377.3c5.4-5.6 7.9-13.5 6.5-21.2V142.3z" />
              </svg>
            </IconButton>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
