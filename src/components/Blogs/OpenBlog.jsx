import React, { useState, useEffect } from 'react';
import Navbar from "../LandingPage/Navbar";
import axios from "axios";
import Like from "../../assets/like.png";
import Dislike from "../../assets/dislike.png";
import Heart from "../../assets/heart.png";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


const OpenBlog = ({ match }) =>{

    const [blog, setBlog] = useState({
        title: "",
        content: "",
        image:"",
        comments:[],
        likes:0,
        dislikes:0,
        hearts:0,
    });

    const LINK = process.env.REACT_APP_HEROKU_LINK;

    useEffect(()=>{
        axios
            .get(`${LINK}blog/${match.params.id}`)
            .then((response) => {
            setBlog(response.data);
        })
        .catch((error) => console.log(error));

    },[LINK, match.params.id])

    const errorNotify = (message) => {
        toast.error(message);
    };

    return(
        <React.Fragment> 
            <ToastContainer/>
            <Navbar/>
            <div className="container" id="container">
                <div className="text-center">
                    <img src={blog.image} alt="" className="img-fluid" style={{filter:"grayscale(100%)"}}/>
                </div>              
                <h2 className="mt-5 mb-2">{blog.title}</h2>
                <hr></hr>
                <p> {blog.content}</p>
                <hr></hr>
                <div className="row">
                    <div className="col-sm-4" id="icon-container">
                        <img src={Like} alt="" onClick={()=>errorNotify('You need to login to like')}/>
                        <p>Likes: {blog.likes}</p>
                    </div>
                    <div className="col-sm-4" id="icon-container" onClick={()=>errorNotify('You need to login to dislike')}>
                        <img src={Dislike} alt=""/>
                        <p>Dislikes: {blog.dislikes}</p>
                    </div>
                    <div className="col-sm-4" id="icon-container" onClick={()=>errorNotify('You need to login to addheart')}>
                        <img src={Heart} alt=""/>
                        <p>Hearts: {blog.hearts}</p>
                    </div>
                </div>
                <hr></hr>
                <h5 className="mt-4 mb-4">Comment Section</h5>
                {blog.comments.map((comment)=>(
                    <React.Fragment key={comment.id}>
                        <p>{comment.comments}</p>
                        <hr></hr>
                    </React.Fragment>                  
                ))}
                <div style={{height:"100px"}}></div>
            </div>
        </React.Fragment> 
    )
}

export default OpenBlog;