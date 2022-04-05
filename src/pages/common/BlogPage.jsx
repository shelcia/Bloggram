import React, { useEffect, useState } from "react";
import { Box, Fab, SwipeableDrawer } from "@mui/material";
import { useParams } from "react-router-dom";
import { apiBlog } from "../../services/models/BlogModel";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
// import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
const parse = require("html-react-parser");

const BlogPage = () => {
  const { id } = useParams();

  const [blog, setBlog] = useState({
    content: "",
    desc: "",
    likes: 0,
    tags: [],
    title: "",
    type: "DRAFT",
    userId: "",
    _id: "",
    comments: [],
  });

  useEffect(() => {
    const ac = new AbortController();
    apiBlog.getSingle(id, ac.signal).then((res) => {
      //   console.log(res);
      if (res.status === "200") {
        setBlog(res.message);
      }
    });

    return () => {
      ac.abort();
    };
  }, [id]);

  const [drawer, setDrawer] = useState(false);

  return (
    <section className="container p-5">
      <h1 className="display-3 text">{blog.title}</h1>
      <p className="lead text-grey mb-4" style={{ fontStyle: "italic" }}>
        {blog.desc}
      </p>
      {parse(blog.content)}
      <div style={style}>
        <Fab
          color="primary"
          aria-label="edit"
          className="me-2 flex-column"
          onClick={() => setDrawer(true)}
        >
          <ModeCommentIcon className="d-block" />
          <span style={{ fontSize: "0.7rem", lineHeight: "6.4px" }}>
            {blog.comments.length}
          </span>
        </Fab>
        <Fab color="error" aria-label="love" className="flex-column">
          <FavoriteRoundedIcon />
          <span style={{ fontSize: "0.7rem", lineHeight: "6.4px" }}>
            {blog.likes}
          </span>
        </Fab>
      </div>
      <CommentSection
        drawer={drawer}
        setDrawer={setDrawer}
        comments={blog.comments}
      />
    </section>
  );
};

export default BlogPage;

const CommentSection = ({ drawer, setDrawer, comments }) => {
  const toggleDrawer = (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawer(false);
  };

  return (
    <SwipeableDrawer
      anchor={"right"}
      open={drawer}
      onClose={() => setDrawer(false)}
      onOpen={() => setDrawer(true)}
    >
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={toggleDrawer}
        onKeyDown={toggleDrawer}
      >
        {/* {comments.map((comment, index)=>
          

          
          )} */}
      </Box>
    </SwipeableDrawer>
  );
};

const style = {
  margin: 0,
  top: "auto",
  right: 20,
  bottom: 20,
  left: "auto",
  position: "fixed",
};
