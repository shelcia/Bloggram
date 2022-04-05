import React, { useEffect, useState } from "react";
import { Box, Fab, SwipeableDrawer, Tooltip } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { apiBlog } from "../../services/models/BlogModel";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import { ViewBlogShapes } from "../../components/Shapes";
import LoadingPage from "./LoadingPage";
import BackToTop from "../../components/ScrollToTop";
import EditIcon from "@mui/icons-material/Edit";
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

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ac = new AbortController();
    apiBlog.getSingle(id, ac.signal).then((res) => {
      //   console.log(res);
      if (res.status === "200") {
        setBlog(res.message);
        setLoading(false);
      } else {
        setLoading(false);
      }
    });

    return () => {
      ac.abort();
    };
  }, [id]);

  const [drawer, setDrawer] = useState(false);

  const navigate = useNavigate();

  const userId = localStorage.getItem("BlogGram-UserId");

  return loading ? (
    <LoadingPage />
  ) : (
    <>
      <ViewBlogShapes />
      <section className="container p-5">
        <div className="text-center mb-4">
          {blog.image && (
            <img
              src={`http://localhost:8000/api/blog/image/${blog._id}`}
              alt=""
              className="me-4 img-fluid"
            />
          )}
        </div>

        <h1 className="display-3 text" id="blog-top">
          {blog.title}
        </h1>
        <p className="lead text-grey mb-4" style={{ fontStyle: "italic" }}>
          {blog.desc}
        </p>
        {parse(blog.content)}
        <div style={style}>
          <Fab
            color="primary"
            aria-label="comments"
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
        {userId === blog.userId && (
          <div style={editstyle}>
            <Tooltip title="Edit Blog">
              <Fab
                color="secondary"
                aria-label="edit"
                onClick={() => navigate(`/dashboard/edit-blog/${blog._id}`)}
                variant="extended"
              >
                <EditIcon sx={{ mr: 1 }} /> Edit Blog
              </Fab>
            </Tooltip>
          </div>
        )}

        <CommentSection
          drawer={drawer}
          setDrawer={setDrawer}
          comments={blog.comments}
        />
      </section>
      <BackToTop id="blog-top" />
    </>
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
  right: "50%",
  transform: "translateX(50%)",
  bottom: 20,
  left: "auto",
  position: "fixed",
};

const editstyle = {
  margin: 0,
  bottom: "auto",
  transform: "translateX(50%)",
  top: 20,
  right: 100,
  left: "auto",
  position: "fixed",
};
