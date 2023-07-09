import React, { useEffect, useState } from "react";
import {
  Box,
  Divider,
  Fab,
  SwipeableDrawer,
  TextField,
  Tooltip,
  Avatar as MuiAvatar,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { apiBlog } from "../../services/models/BlogModel";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import LoadingPage from "./LoadingPage";
import BackToTop from "../../components/ScrollToTop";
import EditIcon from "@mui/icons-material/Edit";
import toast from "react-hot-toast";
import { apiUsers } from "../../services/models/UserModel";
// import Avatar from "avataaars";
import { convertSimpleDate } from "../../helpers/convertDate";
import { CYCLIC_BASE_URL } from "../../services/api";
import parse from "html-react-parser";

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

  const _getBlog = (id, signal) => {
    apiBlog.getSingle(id, signal).then((res) => {
      //   console.log(res);
      if (res.status === "200") {
        setBlog(res.message);
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    const ac = new AbortController();
    _getBlog(id, ac.signal);

    return () => {
      ac.abort();
    };
  }, [id]);

  const [drawer, setDrawer] = useState(false);

  const navigate = useNavigate();

  const userId = localStorage.getItem("BlogGram-UserId");

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
    // console.log(blog);

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
        _getUser(blog.userId);
        _getBlog(id);
      } else {
        toast.error(res.message);
      }
    });
  };

  const _getUser = (id, signal) => {
    if (!blog.userId) {
      return;
    }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading ? (
    <LoadingPage />
  ) : (
    <>
      <section className="container p-5">
        <div className="text-center mb-4">
          {blog.image && (
            <img
              src={`${CYCLIC_BASE_URL}/blog/image/${blog._id}`}
              alt=""
              className="me-4 img-fluid"
            />
          )}
        </div>

        <h1 className="display-3" id="blog-top">
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
          <Fab
            color="error"
            aria-label="love"
            className="flex-column"
            onClick={handleLike}
          >
            <FavoriteRoundedIcon />
            <span style={{ fontSize: "0.7rem", lineHeight: "6.4px" }}>
              {blog.likes?.length}
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
          setBlog={setBlog}
        />
      </section>
      <BackToTop id="blog-top" />
    </>
  );
};

export default BlogPage;

const CommentSection = ({ drawer, setDrawer, comments, setBlog }) => {
  const toggleDrawer = (event) => {
    // console.log(event);

    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    if (event && event.type === "keydown") {
      return;
    }

    setDrawer(false);
  };

  const [comment, setComment] = useState("");

  const { id } = useParams();

  const userId = localStorage.getItem("BlogGram-UserId");

  const addComment = () => {
    //   console.log("executed");
    const commentId = Date.now();
    const response = {
      comments: comments.concat({
        id: commentId,
        userId: userId,
        comment: comment,
      }),
    };

    apiBlog.put(response, `comments/${id}`).then((res) => {
      // console.log(res);
      if (res.status === "200") {
        toast.success(res.message);
        fetchBlog();
      } else {
        toast.error(res.message);
      }
    });
    setComment("");
  };

  const fetchBlog = () => {
    apiBlog.getSingle(id, undefined).then((res) => {
      //   console.log(res);
      if (res.status === "200") {
        setBlog(res.message);
        // setLoading(false);
      } else {
        // setLoading(false);
      }
    });
  };

  return (
    <SwipeableDrawer
      anchor={"right"}
      open={drawer}
      onClose={(event) => {
        // console.log(event);
        if (
          event &&
          event.type === "keydown" &&
          (event.key === "Tab" || event.key === "Shift")
        ) {
          return;
        }

        setDrawer(false);
      }}
      onOpen={() => setDrawer(true)}
    >
      <Box
        sx={{ width: 350, padding: 3 }}
        role="presentation"
        onClick={toggleDrawer}
        onKeyDown={toggleDrawer}
      >
        <TextField
          size="small"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addComment();
            }
          }}
          autoFocus={true}
          variant="standard"
          label="Comment"
          fullWidth
          className="mb-4"
          disabled={!localStorage.getItem("BlogGram-UserId")}
        />
        {!localStorage.getItem("BlogGram-UserId") && (
          <i className="text-muted mb-4">
            You have to login to make any comment and like any blog
          </i>
        )}
        {comments.map((comment, index) => (
          <Comment key={index} comment={comment} />
        ))}
      </Box>
    </SwipeableDrawer>
  );
};

const Comment = ({ comment }) => {
  const [user, setUser] = useState({
    name: "",
    avatar: {},
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ac = new AbortController();
    apiUsers
      .getSingle(comment.userId, ac.signal, "getnameavatar")
      .then((res) => {
        // console.log(res);
        if (res.status === "200") {
          // console.log(res.message);
          setUser(res.message);
          setLoading(false);
        } else {
          setLoading(false);
        }
      });

    return () => {
      ac.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="d-flex align-items-center w-100">
        {/* <Tooltip title={user?.name}> */}
        {loading ? (
          <></>
        ) : user.avatar ? (
          <MuiAvatar src="/broke.img" sx={{ width: 30, height: 30 }} />
        ) : (
          <></>
          // <Avatar
          //   style={{ width: 30, height: 30 }}
          //   avatarStyle="Circle"
          //   topType={user?.avatar?.topType}
          //   accessoriesType={user?.avatar?.accessoriesType}
          //   hairColor={user?.avatar?.hairColor}
          //   facialHairType={user?.avatar?.facialHairType}
          //   clotheType={user?.avatar?.clotheType}
          //   clotheColor={user?.avatar?.clotheColor}
          //   eyeType={user?.avatar?.eyeType}
          //   eyebrowType={user?.avatar?.eyebrowType}
          //   mouthType={user?.avatar?.mouthType}
          //   skinColor={user?.avatar?.skinColor}
          // />
        )}
        {/* </Tooltip> */}

        <div className="ms-2 w-100">
          <p>{comment.comment}</p>
          <div className="text-end w-100">
            <i className="text-muted" style={{ fontSize: "0.75rem" }}>
              {convertSimpleDate(comment.date)}
            </i>
          </div>
        </div>
      </div>
      <Divider
        sx={{ marginLeft: 0, marginY: 2, borderColor: "#6c757d" }}
        className="text-muted"
      />
    </div>
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
