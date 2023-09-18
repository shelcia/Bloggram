import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  IconButton,
  Typography,
  Box,
  Avatar,
  Chip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LoadDrafts, LoadPublished } from "../redux/actions";

import { apiUsers } from "../services/models/UserModel";
import { apiBlog } from "../services/models/BlogModel";
import { /*CYCLIC_BASE_URL,*/ LOCALHOST_URL } from "../services/api";

import {
  MoreHoriz as MoreHorizIcon,
  Share as ShareIcon,
} from "@mui/icons-material";

import { convertSimpleDate } from "../helpers/convertDate";
import { toast } from "react-hot-toast";

import CustomPopover from "./CustomPopover";
import CustomMenuList from "./CustomMenuList";

import Img from "../assets/placeholders/bloggram-placeholder.png";
import DummyAvatar from "../assets/placeholders/dummy-user.png";
import { PREFIX } from "../constants";
import SocialModal from "./CustomShareModal";
import { handleLike } from "../helpers/blogMethods";
import {
  CustomLikeComponent,
  CustomShareComponent,
} from "./CustomBlogComponents";
import { isCookieExist, isSameUser } from "../helpers/isValidToken";

const BlogList = ({ blog, likedBlogs = [], savedBlogs = [] }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchBlog = () => {
    const userId = localStorage.getItem(`${PREFIX}UserId`);
    apiBlog.getSingle(userId, undefined, "myBlogs").then((res) => {
      if (res.status === "200") {
        dispatch(
          LoadDrafts(res.message.filter((blog) => blog.type === "DRAFT"))
        );
        dispatch(
          LoadPublished(res.message.filter((blog) => blog.type !== "DRAFT"))
        );
      }
    });
  };

  const [user, setUser] = useState({
    name: "",
    date: "",
  });

  const _getUser = (id, signal) => {
    apiUsers.getSingle(id, signal).then((res) => {
      // console.log(res.message);
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

  const [open, setOpen] = React.useState(false);

  const gotoBlog = () => navigate(`/blog/${blog._id}`);
  const gotoEditBlog = () => navigate(`/edit-blog/${blog._id}`);

  // for popover blog list
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePublish = (type) => {
    if (type === "PUBLISHED") {
      if (blog.title === "") {
        gotoEditBlog();
        toast.error("Fill in the title");
        return;
      }
      if (blog.desc === "") {
        gotoEditBlog();
        toast.error("Fill in the Description");
        return;
      }
      if (blog.content === "") {
        gotoEditBlog();
        toast.error("Fill in the Content");
        return;
      }
      if (blog?.tags?.length === 0) {
        gotoEditBlog();
        toast.error("Fill in the tags");
        return;
      }
    }

    apiBlog.put({ type: type }, `type/${blog._id}`).then((res) => {
      // console.log(res);
      if (res.status === "200") {
        toast.success(res.message);
        fetchBlog();
      } else {
        toast.error(res.message);
      }
    });
  };

  const _deleteUser = (id) => {
    apiBlog.remove(id).then((res) => {
      console.log(res);
      if (res.status === "200") {
        toast.success("Blog Deleted");
        fetchBlog();
        // setUser(res.message);
      } else {
        toast.error("Blog deletion failed !");
      }
    });
  };

  return (
    <React.Fragment>
      <Card
        sx={{
          width: "100%",
          cursor: "pointer",
        }}
        className="mb-5"
      >
        <CardContent className="mt-3 d-flex align-items-center">
          <img
            src={`${LOCALHOST_URL}/blog/image/${blog?._id}`}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = Img;
            }}
            alt=""
            style={{
              width: 100,
              height: 100,
              objectFit: "cover",
              borderRadius: `0.5rem`,
            }}
            className="me-4"
            onClick={gotoBlog}
            loading="lazy"
          />
          <Box className="w-100">
            <Typography variant="h5" className="mt-3" onClick={gotoBlog}>
              {blog?.title}
            </Typography>
            <Box className="d-flex justify-content-between w-100">
              <Box className="d-flex align-items-center">
                <Avatar
                  src={`${LOCALHOST_URL}/user/image/${blog?.userId}`}
                  sx={{ width: 20, height: 20 }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = DummyAvatar;
                  }}
                />
                <small className="mb-0 text-muted ms-2">{user?.name}</small>{" "}
                <small className="mb-0 fw-light text-muted ms-2">
                  {convertSimpleDate(user?.date)}
                </small>
                {/* {blog?.type === "PUBLISHED" ? (
                  <small className="mb-0 fw-light text-muted ms-2">
                    Published on {convertSimpleDate(user?.date)}
                  </small>
                ) : (
                  <small className="mb-0 fw-light text-muted ms-2">
                    Last Saved on {convertSimpleDate(user?.date)}
                  </small>
                )} */}
              </Box>
              <Box>
                <CustomLikeComponent
                  id={blog._id}
                  likedBlogs={likedBlogs}
                  handleLike={handleLike}
                  _getUser={_getUser}
                />
                <CustomShareComponent
                  id={blog._id}
                  savedBlog={savedBlogs}
                  handleLike={handleLike}
                  _getUser={_getUser}
                />
                {/* {blog?.type === "PUBLISHED" && ( */}
                <IconButton aria-label="share" onClick={() => setOpen(true)}>
                  <ShareIcon />
                </IconButton>
                {/* )} */}

                {isCookieExist() && isSameUser(blog.userId) && (
                  <>
                    <IconButton aria-label="menu" onClick={handleClick}>
                      <MoreHorizIcon />
                    </IconButton>
                    <CustomPopover
                      anchorEl={anchorEl}
                      setAnchorEl={setAnchorEl}
                    >
                      <>
                        {blog?.type === "PUBLISHED" ? (
                          <CustomMenuList
                            onClick={() => handlePublish("DRAFT")}
                          >
                            Unpublish
                          </CustomMenuList>
                        ) : (
                          <CustomMenuList
                            onClick={() => handlePublish("PUBLISHED")}
                          >
                            Publish
                          </CustomMenuList>
                        )}
                        <CustomMenuList
                          onClick={() => navigate(`/edit-blog/${blog?._id}`)}
                        >
                          Edit
                        </CustomMenuList>
                        <CustomMenuList onClick={() => _deleteUser(blog?._id)}>
                          Remove
                        </CustomMenuList>
                      </>
                    </CustomPopover>
                  </>
                )}
              </Box>
            </Box>
            <Box>
              {blog?.tags?.map((tag) => (
                <Chip label={tag} key={tag} sx={{ mr: 1 }} />
              ))}
            </Box>
          </Box>
        </CardContent>
      </Card>
      <SocialModal
        open={open}
        setOpen={setOpen}
        url={`https://bloggram.netlify.app/blog/${blog?._id}`}
        name={blog?.title}
      />
    </React.Fragment>
  );
};

export default BlogList;
