import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../LandingPage/Navbar";
// import axios from "axios";
import { LoadPost } from "../actions/index";
import { Link } from "react-router-dom";
import LinesEllipsis from 'react-lines-ellipsis';
import Like from "../../assets/like.png";
import Dislike from "../../assets/dislike.png";
import Heart from "../../assets/heart.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Blog = () => {
  
    const LINK = process.env.REACT_APP_HEROKU_LINK;
    const allPost = useSelector((state) => state.posts);
    const dispatch = useDispatch();

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

    const errorNotify = (message) => {
        toast.error(message);
    };

  return (
    <React.Fragment>
    <ToastContainer/>
    <Navbar/>
        <div className="container" id="container" style={{maxWidth: "450px"}}>
            {allPost.map((post)=>(
                <div className="card w-100 mt-2" key={post.id}>
                    <img className="img-fluid"  src={post.image} alt="Card" style={{filter: 'grayscale(100%)'}}/>
                    <div className="card-body">
                        <h4 className="card-title">{post.title}</h4>
                            <LinesEllipsis
                            text={post.content}
                            maxLine='4'
                            ellipsis='...'
                            trimRight
                            basedOn='letters'
                            />
                        <Link to={`/blog/${post.id}`} className="btn btn-primary mt-3">See More &#62;&#62;</Link>
                        <hr></hr>
                        <div className="row">
                          <div className="col-sm-4" id="icon-container">
                            <img src={Like} alt="" onClick={()=>errorNotify('You have to login to like')}/>
                            <p>{post.likes}</p>
                          </div>
                          <div className="col-sm-4" id="icon-container">
                            <img src={Dislike} alt="" onClick={()=>errorNotify('You have to login to dislike')}/>
                             <p>{post.dislikes}</p>
                          </div>
                          <div className="col-sm-4" id="icon-container">
                            <img src={Heart} alt="" onClick={()=>errorNotify('You have to login to add heart')}/>
                              <p>{post.hearts}</p>
                          </div>
                        </div>
                    </div>
                </div>  
            ))}
            </div>
    </React.Fragment>
  )
}

export default Blog;