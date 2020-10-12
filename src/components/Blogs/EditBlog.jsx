import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../HomePage/Navbar";
import axios from "axios";
import Loading from "../Loading";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";


const BlogEdit = ({ match }) =>{

    const [isLoading , setIsLoading] = useState(false);
    
    const results = useSelector((state) => state.posts);
    const blog = results.filter((result) => result.id === match.params.id);

    const id = match.params.id;
    const LINK = process.env.REACT_APP_HEROKU_LINK;

    const[title, setTitle] = useState(blog[0].title);
    const[content, setContent] = useState(blog[0].content);
    const[image, setImage] = useState(blog[0].image);

    const history = useHistory();

    const errorNotify = (message) => {
        toast.error(message);
    };

    const succesNotify = (message) => {
        toast.success(message);
    };
    
    const editBlog = (e) =>{
        e.preventDefault();
        setIsLoading(true);
        
        const response = { title: title, content: content,  image: image};
        axios
            .put(`${LINK}myblogs/edit/${id}`, response)
            .then((res) => {
                setIsLoading(false);
                succesNotify('Succesfully edited !!');
            })
            .catch((error) => {
                errorNotify('Error editing the blog')
                console.log(error);
            });
    }

    const deleteBlog = (e) => {

        e.preventDefault();
        const token = localStorage.getItem("BlogGram-Token");

        fetch(`${LINK}myblogs/delete/${id}`, {
            method: "DELETE",
            headers: {
                "auth-token": token,
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        })
        .then((res) => res.json())
        .then((data) => {
            history.push('/dashboard/myblogs')
            succesNotify('Succesfully edited !!');

        })
        .catch((error) => {
            errorNotify(error);
        });
    }

    return(
        <React.Fragment>
            {isLoading ? <Loading/> :
           
            <React.Fragment>
            <ToastContainer/>
            <Navbar/>
            <div className="container" id="container">
                <h4>Edit your blog</h4>
                <hr></hr>
                     <form onSubmit={editBlog}>
                    <div className="form-group">
                        <label htmlFor="imglink">Image Link:</label>
                        <input type="text" className="form-control" value={image} placeholder="Enter image link" id="imglink" onChange={(e)=>setImage(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="title">Title:</label>
                        <input type="text" className="form-control" value={title} placeholder="Enter title" id="title" onChange={(e)=>setTitle(e.target.value)} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">Content:</label>
                        <textarea type="text" rows="15"  className="form-control" value={content} placeholder="Enter content" id="content" onChange={(e)=>setContent(e.target.value)} required/>
                    </div>
                    <div className="text-center mb-5">
                        <button type="submit" className="btn btn-primary">Edit Blog</button>
                        <button type="button" className="btn btn-primary ml-2" onClick={(e)=>deleteBlog(e)}>Delete Blog</button>
                    </div>
                </form>
            </div>
            </React.Fragment>
            }
            
        </React.Fragment>
    )

}

export default BlogEdit;