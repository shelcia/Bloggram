import React, { useEffect, useState } from "react";
// import { PREFIX } from "../constants";
// import { isCookieExist } from "../helpers/isValidToken";
// import toast from "react-hot-toast";
// import { apiBlog } from "../services/models/BlogModel";
import {
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteIcon,
  BookmarkBorder as BookmarkBorderIcon,
  Share as ShareIcon,
} from "@mui/icons-material";
import { apiUsers } from "../services/models/UserModel";
import { LOCALHOST_URL } from "../services/api";
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
import { handleLike } from "../helpers/blogMethods";

const BlogCard = ({ blog }) => {
  // const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    avatar: {},
    date: "",
    likedBlogs: [],
  });

  const _getUser = (id, signal) => {
    apiUsers.getSingle(blog.userId, signal).then((res) => {
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
          src={`${LOCALHOST_URL}/blog/image/${blog?._id}`}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = Img;
          }}
          alt=""
          style={{ width: "100%", height: "200px", objectFit: "cover" }}
          loading="lazy"
        />
        <CardContent className="mt-3">
          <Box className="d-flex align-items-center justify-content-between">
            <Box className="d-flex align-items-center">
              <MuiAvatar
                src={`${LOCALHOST_URL}/user/image/${blog?.userId}`}
                sx={{ width: 30, height: 30 }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = Img;
                }}
              />
              <small className="mb-0 text-muted ms-2">{user?.name}</small>{" "}
              <small className="mb-0 fw-light text-muted ms-2">
                Published on {convertSimpleDate(user?.date)}
              </small>
            </Box>
            <Box>
              {user?.likedBlogs?.includes(blog?._id) ? (
                <IconButton
                  aria-label="like"
                  color="error"
                  onClick={() => handleLike(blog?._id)}
                >
                  <FavoriteIcon />
                </IconButton>
              ) : (
                <IconButton
                  aria-label="like"
                  onClick={() => handleLike(blog?._id)}
                >
                  <FavoriteBorderIcon />
                </IconButton>
              )}

              <IconButton aria-label="save">
                <BookmarkBorderIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
            </Box>
          </Box>
          <Typography variant="h5" className="my-3">
            <LinesEllipsis
              text={blog?.title}
              maxLine="1"
              ellipsis="..."
              trimRight
              basedOn="letters"
            />
          </Typography>
          <Typography variant="h6" style={{ fontWeight: 400 }}>
            <LinesEllipsis
              text={blog?.desc}
              maxLine="2"
              ellipsis="..."
              trimRight
              basedOn="letters"
            />
          </Typography>
          {/* <div className="text-end my-2">
              {blog.type === "PUBLISHED" && (
                <small className="mb-0 fw-light text-muted ms-2">
                  Published on {convertSimpleDate(user?.date)}
                </small>
              )}
            </div> */}
          <Box sx={{ mt: 1 }}>
            {blog?.tags?.map((tag) => (
              <Chip label={tag} key={tag} sx={{ mr: 1 }} />
            ))}
          </Box>
          {/* <div
              className="text-center"
              onClick={() => navigate(`/blog/${blog._id}`)}
            >
              <Button variant="outlined" size="small">
                Read More
              </Button>
            </div> */}
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

export default BlogCard;
