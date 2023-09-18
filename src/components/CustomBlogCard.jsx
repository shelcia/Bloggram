import React, { useEffect, useState } from "react";
import { Share as ShareIcon } from "@mui/icons-material";
import { apiUsers } from "../services/models/UserModel";
import { /* LOCALHOST_URL,*/ CYCLIC_BASE_URL } from "../services/api";
import {
  Avatar as MuiAvatar,
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Chip,
} from "@mui/material";
import LinesEllipsis from "react-lines-ellipsis";
import Img from "../assets/placeholders/bloggram-placeholder.png";
import { convertSimpleDate } from "../helpers/convertDate";
import { handleLike, handleSave } from "../helpers/blogMethods";
import {
  CustomLikeComponent,
  CustomShareComponent,
} from "./CustomBlogComponents";
import { useNavigate } from "react-router-dom";

const BlogCard = ({
  blog,
  likedBlogs = [],
  savedBlogs = [],
  getCurrUser = () => {},
}) => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    date: "",
  });

  const _getUser = (id, signal) => {
    apiUsers.getSingle(id, signal).then((res) => {
      if (res.status === "200") {
        setUser(res.message);
      }
    });
  };

  useEffect(() => {
    const ac = new AbortController();
    _getUser(blog.userId, ac.signal);

    return () => {
      ac.abort();
    };
  }, []);

  return (
    <React.Fragment>
      <Card>
        <img
          src={`${CYCLIC_BASE_URL}/blog/image/${blog?._id}`}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = Img;
          }}
          alt=""
          style={{ width: "100%", height: "200px", objectFit: "cover" }}
          loading="lazy"
          onClick={() => navigate(`/blog/${blog._id}`)}
        />
        <CardContent className="mt-3">
          <Box
            className="d-flex align-items-center justify-content-between"
            sx={{ flexDirection: { xs: "column", md: "row" } }}
          >
            <Box
              className="d-flex align-items-center"
              onClick={() => navigate(`/blog/${blog._id}`)}
            >
              <MuiAvatar
                src={`${CYCLIC_BASE_URL}/user/image/${blog?.userId}`}
                sx={{ width: 30, height: 30 }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = Img;
                }}
              />
              <small className="mb-0 text-muted ms-2">{user?.name}</small>{" "}
              <small className="mb-0 fw-light text-muted ms-2">
                {/* Published on  */}
                {convertSimpleDate(user?.date)}
              </small>
            </Box>
            <Box>
              <CustomLikeComponent
                id={blog._id}
                likedBlogs={likedBlogs}
                handleLike={handleLike}
                _getUser={() => getCurrUser()}
              />
              <CustomShareComponent
                id={blog._id}
                savedBlog={savedBlogs}
                handleSave={handleSave}
                _getUser={() => getCurrUser()}
              />
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
            </Box>
          </Box>
          <Typography
            variant="h5"
            className="my-3"
            onClick={() => navigate(`/blog/${blog._id}`)}
          >
            <LinesEllipsis
              text={blog?.title}
              maxLine="1"
              ellipsis="..."
              trimRight
              basedOn="letters"
            />
          </Typography>
          <Typography
            variant="h6"
            style={{ fontWeight: 400 }}
            onClick={() => navigate(`/blog/${blog._id}`)}
          >
            <LinesEllipsis
              text={blog?.desc}
              maxLine="2"
              ellipsis="..."
              trimRight
              basedOn="letters"
            />
          </Typography>
          <Box sx={{ mt: 1 }}>
            {blog?.tags?.map((tag) => (
              <Chip label={tag} key={tag} sx={{ mr: 1 }} />
            ))}
          </Box>
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

export default BlogCard;
