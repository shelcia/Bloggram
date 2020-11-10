import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "./Navbar";
import axios from "axios";
import { LoadPost, AddLike, AddDislike, AddHearts } from "../actions/index";
import { Link } from "react-router-dom";
import LinesEllipsis from "react-lines-ellipsis";
import Like from "../../assets/like.png";
import Dislike from "../../assets/dislike.png";
import Heart from "../../assets/heart.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import Loading from "../Loading";

const Feed = () => {
  const LINK = process.env.REACT_APP_HEROKU_LINK;
  const allPost = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      setLoading(true);
      try {
        const posts = await fetch(`${LINK}blog`);
        dispatch(LoadPost(await posts.json()));
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getPost();
  }, [LINK, dispatch]);

  const errorNotify = (message) => {
    toast.error(message);
  };

  const addLikes = useCallback(
    (id, value) => {
      const response = {
        likes: value + 1,
      };
      axios
        .put(`${LINK}likes/${id}`, response)
        .then((res) => {
          const newAllPost = allPost.map((post) => {
            if (post.id === id) {
              const updatedPost = {
                ...post,
                likes: response.likes,
              };
              return updatedPost;
            }
            return post;
          });
          dispatch(AddLike(newAllPost));
          //   console.log(res);
        })
        .catch((error) => {
          console.log(error);
          errorNotify('Oops! The like couldn"t be added 🥺🥺!!');
        });
    },
    [LINK, allPost, dispatch]
  );

  const disLikes = useCallback(
    (id, value) => {
      // console.log("clicked");
      const response = {
        dislikes: value + 1,
      };
      axios
        .put(`${LINK}dislikes/${id}`, response)
        .then((res) => {
          const newAllPost = allPost.map((post) => {
            if (post.id === id) {
              const updatedPost = {
                ...post,
                dislikes: response.dislikes,
              };
              return updatedPost;
            }
            return post;
          });
          dispatch(AddDislike(newAllPost));
          //   console.log(res);
        })
        .catch((error) => {
          console.log(error);
          errorNotify('Oops! The dislike couldn"t be added 🥺🥺!!');
        });
    },
    [LINK, allPost, dispatch]
  );

  const hearts = useCallback(
    (id, value) => {
      // console.log(id);
      const response = {
        hearts: value + 1,
      };
      axios
        .put(`${LINK}hearts/${id}`, response)
        .then((res) => {
          const newAllPost = allPost.map((post) => {
            if (post.id === id) {
              const updatedPost = {
                ...post,
                hearts: response.hearts,
              };
              return updatedPost;
            }
            return post;
          });
          dispatch(AddHearts(newAllPost));
          //   console.log(res);
        })
        .catch((error) => {
          console.log(error);
          errorNotify('Oops! The heart couldn"t be added 🥺🥺!!');
        });
    },
    [LINK, allPost, dispatch]
  );

  return (
    <React.Fragment>
      <ToastContainer />
      <Navbar />
      {isLoading ? (
        <Loading text="Loading Feed..." />
      ) : (
        <div className="container" id="container" style={{ maxWidth: "450px" }}>
          <div style={{ flexDirection: "column-reverse" }} className="d-flex">
            {allPost.map((post) => (
              <div className="card w-100 mt-2" key={post.id}>
                <img
                  className="img-fluid"
                  src={post.image}
                  alt="Card"
                  style={{ filter: "grayscale(100%)" }}
                />
                <div className="card-body">
                  <h4 className="card-title">{post.title}</h4>
                  <LinesEllipsis
                    text={post.content}
                    maxLine="4"
                    ellipsis="..."
                    trimRight
                    basedOn="letters"
                  />
                  <Link
                    to={`/blog/${post.id}`}
                    className="btn btn-primary mt-3"
                  >
                    See More &#62;&#62;
                  </Link>
                  <hr></hr>
                  <div className="row">
                    <div className="col-sm-4" id="icon-container">
                      <img
                        src={Like}
                        alt=""
                        onClick={() => addLikes(post.id, post.likes)}
                      />
                      <p>{post.likes}</p>
                    </div>
                    <div className="col-sm-4" id="icon-container">
                      <img
                        src={Dislike}
                        alt=""
                        onClick={() => disLikes(post.id, post.dislikes)}
                      />
                      <p>{post.dislikes}</p>
                    </div>
                    <div className="col-sm-4" id="icon-container">
                      <img
                        src={Heart}
                        alt=""
                        onClick={() => hearts(post.id, post.hearts)}
                      />
                      <p>{post.hearts}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Feed;
