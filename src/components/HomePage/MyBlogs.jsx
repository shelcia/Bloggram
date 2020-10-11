import React, { useEffect, useState } from 'react';
import Navbar from "./Navbar";
import { Link } from 'react-router-dom';
import LinesEllipsis from 'react-lines-ellipsis'
import axios from "axios";
import AddNewBlog from "./AddNewBlog";

const MyBlog = () =>{

  const [blogs, setBlogs] = useState([]);
  const LINK = process.env.REACT_APP_HEROKU_LINK;
  const id = localStorage.getItem("BlogGram-UserId");

  useEffect(() => {
    const getMyPost = () => {
      axios
        .get(`${LINK}myblogs/${id}`)
        .then((response) => {
          setBlogs(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getMyPost();
  }, [LINK, id]);

    return(
        <React.Fragment>
            <AddNewBlog/>
            <Navbar/>
            <div className="container" id="container" style={{maxWidth: "450px"}}>
            <button className="btn btn-primary w-100 mb-3" data-toggle="modal" data-target="#myModal">Add new Blog</button>
            {blogs.map((post)=>(
                <div className="card w-100" key={post.id}>
                    <img className="img-fluid"  src={post.image} alt="Card" />
                    <div className="card-body">
                        <h4 className="card-title">{post.title}</h4>
                            <LinesEllipsis
                            text={post.content}
                            maxLine='4'
                            ellipsis='...'
                            trimRight
                            basedOn='letters'
                            />
                        <Link to={`/blog/${id}`} className="btn btn-primary mt-3">See More &#62;&#62;</Link>
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
            
        </React.Fragment>
    )
}


export default MyBlog;