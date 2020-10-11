import React, {useEffect, useRef, useState } from 'react';
import { useDispatch } from "react-redux";
import Navbar from "../LandingPage/Navbar";
// import axios from "axios";
import { LoadPost } from "../actions/index";
import { Link } from "react-router-dom";
import LinesEllipsis from 'react-lines-ellipsis'



const Blog = () => {


    const [blog,setBlog] = useState([]);

    const LINK = process.env.REACT_APP_HEROKU_LINK;
    const dispatch = useDispatch();

    useEffect(() => {
        const getPost = async () => {
        try {
            const posts = await fetch(`${LINK}blog`);
            dispatch(LoadPost(await posts.json()));
            setBlog(await posts.json());
        } catch (error) {
        console.log(error);
        }
        };
        getPost();
    }, [LINK, dispatch]);

     const search  = useRef('');

     const handleSearch = (e)=>{
       e.preventDefault();
        const searchBlogs = blog.filter((blog) => blog.title === search.current.value);
        setBlog(searchBlogs)
     }
        


  return (
    <React.Fragment>
    <Navbar/>
      <div className="container" id="container">
        <form className="form-inline mx-auto" onSubmit={handleSearch}>
            <input type="type" ref={search} className="form-control" placeholder="Search any Blog" id="blog" style={{ width: "80%"}}/>
            <button type="submit" className="btn btn-primary ml-3" >Submit</button>
        </form>
      </div>
      <div className="container mt-5">
        <div className="card-columns">
          {blog.map((blog)=>(
            <div className="card" key={blog.id}>
              <div className="row">
                <div className="col-sm-5 p-0"><img src={blog.image} alt="" className="card-img-top" style={{filter: 'grayscale(100%)'}}/></div>
                <div className="col-sm-7">
                  <h4 className="card-title mt-2">{blog.title}</h4>
                     <LinesEllipsis
                            text='Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'
                            maxLine='3'
                            ellipsis='...'
                            trimRight
                            basedOn='letters'
                        />
                    <Link to = {`/blog/${blog.id}`} className="card-link">See More &#62;&#62; </Link></div>
              </div>
            </div>
            ))}
        </div>
      </div>
    </React.Fragment>
  )
}

export default Blog;