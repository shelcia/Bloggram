import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import LinesEllipsis from "react-lines-ellipsis";
import axios from "axios";
import Loading from "../Loading";
import { useHistory } from "react-router-dom";

const MyBlog = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const LINK = process.env.REACT_APP_HEROKU_LINK;
  const id = localStorage.getItem("BlogGram-UserId");
  const history = useHistory();

  useEffect(() => {
    const getMyPost = () => {
      setLoading(true);
      axios
        .get(`${LINK}myblogs/${id}`)
        .then((response) => {
          setPosts(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    };

    getMyPost();
  }, [LINK, id]);

  return (
    <React.Fragment>
      {!isLoading ? (
        <React.Fragment>
          <Navbar />
          <div
            className="container"
            id="container"
            style={{ maxWidth: "450px" }}
          >
            <button
              className="btn btn-primary w-100 mb-3"
              onClick={() => history.push("myblogs/newblog")}
            >
              Add new Blog
            </button>
            <div style={{ flexDirection: "column-reverse" }} className="d-flex">
              {posts.map((post) => (
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
                    <Link
                      to={`myblogs/edit/${post.id}`}
                      className="btn btn-primary mt-3 ml-3"
                    >
                      Edit
                    </Link>
                    <hr></hr>
                    <div className="row">
                      <div className="col-sm-4" id="icon-container">
                        <p>Likes: {post.likes}</p>
                      </div>
                      <div className="col-sm-4" id="icon-container">
                        <p>Dislikes: {post.dislikes}</p>
                      </div>
                      <div className="col-sm-4" id="icon-container">
                        <p>Hearts: {post.hearts}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </React.Fragment>
      ) : (
        <Loading />
      )}
    </React.Fragment>
  );
};

export default MyBlog;
