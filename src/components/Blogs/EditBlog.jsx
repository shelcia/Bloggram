import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { LoadPost } from "../actions/index";
import Navbar from "../HomePage/Navbar";
import axios from "axios";



const BlogEdit = ({ match }) =>{

   

    // console.log(match);

    // console.log(match.params.id);

    const allPost = useSelector((state) => state.posts);
    const LINK = process.env.REACT_APP_HEROKU_LINK;

    const blog = allPost.filter((post)=> post.id === match.params.id );
    console.log(blog);

    const[title, setTitle] = useState(blog.title);
    const[content, setContent] = useState(blog.content);
    const[image, setImage] = useState(blog.image);
    
    // if(blog){
    //     setTitle(blog.title);
    //     setContent(blog.content);
    //     setImage(blog.image);     
    // }

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
    
    const editBlog = (e) =>{
        e.preventDefault();
        const userid = localStorage.getItem("BlogGram-UserId");

        const response = { title: title, content:content,  image:image};
        axios
            .put(`${LINK}userdetails/edit/${userid}`, response)
            .then((res) => console.log(res))
            .catch((error) => console.log(error));
    }

    return(
        <React.Fragment>
            {/* <ToastContainer/> */}
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
                        <button type="submit" className="btn btn-primary">Delete Blog</button>
                    </div>
                </form>
            </div>
        </React.Fragment>
    )

}

export default BlogEdit;