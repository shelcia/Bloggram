import React, { useEffect, useState } from "react";
import Img from "../assets/Bloggram_placeholder.png";
import {
  Avatar as MuiAvatar,
  Button,
  Card,
  CardContent,
  IconButton,
  Modal,
  Typography,
  Box,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LinesEllipsis from "react-lines-ellipsis";
import { apiUsers } from "../services/models/UserModel";
import IosShareIcon from "@mui/icons-material/IosShareRounded";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { ShareSocial } from "react-share-social";
import { convertSimpleDate } from "../helpers/convertDate";
import CustomPopover from "./Popover";
import CustomMenuList from "./CustomMenuList";
import { apiBlog } from "../services/models/BlogModel";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { LoadDrafts, LoadPublished } from "../redux/actions";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { CYCLIC_BASE_URL } from "../services/api";

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    avatar: {},
    date: "",
    likedBlogs: [],
  });

  const handleLike = () => {
    const userId = localStorage.getItem("BlogGram-UserId");
    if (!userId) {
      toast.error("Only logged in users can like");
      return;
    }

    const response = {
      userId: userId,
      likes: [
        ...blog.likes,
        {
          userId: userId,
        },
      ],
      likedBlogs: [...user?.likedBlogs, blog._id],
    };
    // console.log(response);

    apiBlog.put(response, `likes/${blog._id}`).then((res) => {
      // console.log(res);
      if (res.status === "200") {
        toast.success(res.message);
        // fetchBlog();
        _getUser();
      } else {
        toast.error(res.message);
      }
    });
  };

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log(blog._id);
  // console.log(user?.likedBlogs);

  // console.log(user?.likedBlogs?.includes(blog._id));

  return (
    <React.Fragment>
      <Card sx={{ height: "500px" }}>
        <img
          src={`${CYCLIC_BASE_URL}/blog/image/${blog._id}`}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = Img;
          }}
          alt=""
          style={{ width: "100%", height: "200px", objectFit: "cover" }}
        />
        <CardContent className="mt-3">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <MuiAvatar src="/broke.img" sx={{ width: 30, height: 30 }} />
              <small className="mb-0 fst-italic text-muted ms-2">
                {user?.name}
              </small>{" "}
            </div>
            <div>
              {/* {blog.type === "PUBLISHED" && (
                  <IconButton aria-label="share" >
                    <IosShareIcon />
                  </IconButton>
                )} */}
              {user?.likedBlogs?.includes(blog._id) ? (
                <IconButton
                  aria-label="like"
                  color="error"
                  onClick={handleLike}
                >
                  <FavoriteIcon />
                </IconButton>
              ) : (
                <IconButton aria-label="like" onClick={handleLike}>
                  <FavoriteBorderIcon />
                </IconButton>
              )}

              <IconButton aria-label="save">
                <BookmarkBorderIcon />
              </IconButton>
            </div>
          </div>
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
              maxLine="3"
              ellipsis="..."
              trimRight
              basedOn="letters"
            />
          </Typography>
          <div className="text-end my-2">
            {blog.type === "PUBLISHED" && (
              <small className="mb-0 fw-light text-muted ms-2">
                Published on {convertSimpleDate(user?.date)}
              </small>
            )}
          </div>
          <div
            className="text-center"
            onClick={() => navigate(`/blog/${blog._id}`)}
          >
            <Button variant="outlined" size="small">
              Read More
            </Button>
          </div>
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

const BlogList = ({ blog }) => {
  const dispatch = useDispatch();

  const fetchBlog = () => {
    const userId = localStorage.getItem("BlogGram-UserId");
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

  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    avatar: {},
    date: "",
  });

  useEffect(() => {
    const ac = new AbortController();
    apiUsers.getSingle(blog.userId, ac.signal).then((res) => {
      if (res.status === "200") {
        setUser(res.message);
      }
    });

    return () => {
      ac.abort();
    };
  }, [blog.userId]);

  const [open, setOpen] = React.useState(false);

  const gotoBlog = () => navigate(`/blog/${blog._id}`);

  // for popover blog list
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePublish = (type) => {
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
      >
        <CardContent className="mt-3 d-flex align-items-center">
          <img
            src={blog.image ? `${CYCLIC_BASE_URL}/blog/image/${blog._id}` : Img}
            alt=""
            style={{ width: 100, height: 100, objectFit: "cover" }}
            className="me-4"
            onClick={gotoBlog}
          />
          <div className="w-100">
            <Typography variant="h5" className="mt-3 mb-1" onClick={gotoBlog}>
              {blog?.title}
            </Typography>
            <div className="d-flex justify-content-between w-100">
              <div className="d-flex align-items-center">
                <Avatar src="/broken-image.jpg" />
                <small className="mb-0 fst-italic text-muted ms-2">
                  {user?.name}
                </small>{" "}
                {blog.type === "PUBLISHED" ? (
                  <small className="mb-0 fw-light text-muted ms-2">
                    Published on {convertSimpleDate(user?.date)}
                  </small>
                ) : (
                  <small className="mb-0 fw-light text-muted ms-2">
                    Last Saved on {convertSimpleDate(user?.date)}
                  </small>
                )}
              </div>
              <div>
                {blog.type === "PUBLISHED" && (
                  <IconButton aria-label="share" onClick={() => setOpen(true)}>
                    <IosShareIcon />
                  </IconButton>
                )}

                <IconButton aria-label="menu" onClick={handleClick}>
                  <MoreHorizIcon />
                </IconButton>
                <CustomPopover anchorEl={anchorEl} setAnchorEl={setAnchorEl}>
                  <>
                    {blog.type === "PUBLISHED" ? (
                      <CustomMenuList onClick={() => handlePublish("DRAFT")}>
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
                      onClick={() =>
                        navigate(`/dashboard/edit-blog/${blog._id}`)
                      }
                    >
                      Edit
                    </CustomMenuList>
                    <CustomMenuList onClick={() => _deleteUser(blog._id)}>
                      Remove
                    </CustomMenuList>
                  </>
                </CustomPopover>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <SocialModal
        open={open}
        setOpen={setOpen}
        url={`https://bloggram.netlify.app/blog/${blog._id}`}
        name={blog.title}
      />
    </React.Fragment>
  );
};

export { BlogCard, BlogList };

const SocialModal = ({ open, setOpen, url, name }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: 400,
    minWidth: "30%",
    bgcolor: "background.paper",
    boxShadow: 24,
  };

  const handleClose = () => setOpen(false);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <ShareSocial
          title={`Hello folks I have published ${name}`}
          url={url}
          socialTypes={["facebook", "twitter", "reddit", "linkedin"]}
        />
      </Box>
    </Modal>
  );
};
