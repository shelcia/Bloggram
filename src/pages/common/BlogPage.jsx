import React, { useEffect, useState } from "react";
import { Fab } from "@mui/material";
import { useParams } from "react-router-dom";
import { apiBlog } from "../../services/models/BlogModel";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
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

  return (
    <section className="container p-5">
      <h1 className="display-3 text">{blog.title}</h1>
      <p className="lead text-grey mb-4" style={{ fontStyle: "italic" }}>
        {blog.desc}
      </p>
      {parse(blog.content)}
      <div style={style}>
        <Fab color="primary" aria-label="edit">
          <ModeCommentIcon />
        </Fab>
        <Fab color="success" aria-label="edit">
          <ThumbUpIcon />
        </Fab>
      </div>
    </section>
  );
};

export default BlogPage;

const style = {
  margin: 0,
  top: "auto",
  right: 20,
  bottom: 20,
  left: "auto",
  position: "fixed",
};
