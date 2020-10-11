import React, { useEffect,  useCallback, useRef } from 'react';
import AuthNavBar from "../HomePage/Navbar";
import { LoadPost, AddLike, AddDislike, AddHearts, AddComment } from "../actions/index";
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Like from "../../assets/like.png";
import Dislike from "../../assets/dislike.png";
import Heart from "../../assets/heart.png";



const AuthBlog = ({match}) =>{

    const commentText = useRef(null);
    const allPost = useSelector((state) => state.posts);
    const LINK = process.env.REACT_APP_HEROKU_LINK;

    const blog = allPost.filter((post)=> post.id === match.params.id ) 
    
    const dispatch = useDispatch();

    const errorNotify = (message) => {
        toast.error(message);
    };

    useEffect(() => {
        const getPost = async () => {
        try {
            const posts = await fetch(`${LINK}blog`);
            dispatch(LoadPost(await posts.json()));
        } catch (error) {
        console.log(error);
        }
        };
        getPost();
    }, [LINK, dispatch]);  


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
    //   console.log("clicked");
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
    //   console.log(id);
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

    const addComment = useCallback(
    (id, value) => {
    //   console.log("executed");
      const commentId = Date.now();
      const response = {
        comments: value.concat({
          id: commentId,
          comments: commentText.current.value,
        }),
      };
    //   console.log(response);
      axios
        .put(`${LINK}comments/${id}`, response)
        .then((res) => {
          const newAllPost = allPost.map((post) => {
            if (post.id === id) {
              const updatedPost = {
                ...post,
                comments: [
                  ...post.comments,
                  { id: commentId, comments: commentText.current.value },
                ],
              };
              return updatedPost;
            }
            return post;
          });
          dispatch(AddComment(newAllPost));
        //   console.log(res);
          commentText.current.value = null;
        })
        .catch((error) => {
          console.log(error);
          errorNotify('Oops! The comment couldn"t be added 🥺🥺!!');
          commentText.current.value = null;
        });
    },
    [LINK, allPost, dispatch]
  );

    return(
        <React.Fragment>
            <ToastContainer/>
            <AuthNavBar/> 
                <div className="container" id="container">
                {blog.map((blog)=>(
                    <React.Fragment key={blog.id}>
                         <div className="text-center">
                    <img src={blog.image} alt="" className="img-fluid" style={{filter:"grayscale(100%)"}}/>
                </div>              
                <h2 className="mt-5 mb-2">{blog.title}</h2>
                <hr></hr>
                <p> {blog.content}</p>
                <hr></hr>
                <div className="row">
                    <div className="col-sm-4" id="icon-container">
                        <img src={Like} alt="" onClick={() => addLikes(blog.id, blog.likes)}/>
                        <p>{blog.likes}</p>
                    </div>
                    <div className="col-sm-4" id="icon-container">
                        <img src={Dislike} alt="" onClick={() => disLikes(blog.id, blog.dislikes)}/>
                        <p>{blog.dislikes}</p>
                    </div>
                    <div className="col-sm-4" id="icon-container">
                        <img src={Heart} alt="" onClick={() => hearts(blog.id, blog.hearts)} />
                        <p>{blog.hearts}</p>
                    </div>
                </div>
                <hr></hr>
                <h5 className="mt-4">Comment Section</h5>
                <form className="d-flex mb-3 mt-3">
                    <input type="text" ref={commentText} className="form-control" placeholder="Enter comment" id="comment" style={{width:"80%"}}/>
                    <button 
                        className="btn btn-primary" 
                        style={{width:"20%"}} 
                        onClick={(event) => {
                            event.preventDefault();
                            addComment(blog.id, blog.comments);
                        }}>Add Comment</button>
                </form>
                {blog.comments.map((comment)=>(
                    <div key={comment.id}>
                        <p >{comment.comments}</p>
                        <hr></hr>
                    </div>
                ))}
                <div style={{height:"100px"}}></div>
                    </React.Fragment>

                ))}
               
            </div>
        </React.Fragment>
    )
}

export default AuthBlog;