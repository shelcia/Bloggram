import React, { useRef } from 'react';
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AddPost } from "../actions/index";
import { useHistory } from "react-router-dom";


const AddNewBlog = ({ setIsLoading }) => {

    const titleText = useRef("");
    const contentText = useRef("");
    const imgText = useRef("");
    const categoryText = useRef("");

    const dispatch = useDispatch();

    const history = useHistory();

    const successNotify = (message) => {
        toast.success(message);
    };

    const errorNotify = (message) => {
        toast.error(message);
    };

    const addBlog = async(e) =>{
        e.preventDefault();
        // setIsLoading(true);

        const LINK = process.env.REACT_APP_HEROKU_LINK;
        
        const userid = localStorage.getItem("BlogGram-UserId");

        const response = {

            id: Date.now().toString(),
            userId: userid,
            title: titleText.current.value,
            content:contentText.current.value,
            likes: 0,
            dislikes: 0,
            hearts: 0,
            comments: [],
            category:categoryText.current.value,
            image: imgText.current.value

        };

        // console.log(response);

         try {
            await fetch(`${LINK}blog`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(response),
        });
        dispatch(AddPost(response));
        // setIsLoading(false);
        successNotify('Blog added succesfully !!');
        } catch (error) {
            console.log(error);
            errorNotify('Oops! The blog couldn"t be added 🥺🥺!!');
        }
        history.push('/dashboard/feed');
    }

    return(
        <React.Fragment>
            <ToastContainer/>
            <div className="container" id="container">
                <h4>Share your thoughts !!</h4>
                <hr></hr>
                <form onSubmit={addBlog}>
                    <div className="form-group">
                        <label htmlFor="imglink">Image Link:</label>
                        <input type="text" ref={imgText} className="form-control" placeholder="Enter image link" id="imglink" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="title">Title:</label>
                        <input type="text" ref={titleText} className="form-control" placeholder="Enter title" id="title" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">Content:</label>
                        <textarea type="text" rows="15" ref={contentText} className="form-control" placeholder="Enter content" id="content" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">Category:</label>
                        <select className="form-control" ref={categoryText} id="content" placeholder="Enter content" required>
                            <option>Life Style</option>
                            <option>Web Development</option>
                            <option>Technology</option>
                            <option>Architecture</option>
                            <option>Fashion Design</option>
                            <option>Automobile</option>
                            <option>Others</option>
                        </select>
                    </div>
                    <div className="text-center mt-5">
                        <button type="submit" className="btn btn-primary">Add Blog</button>
                    </div>
                </form>
            </div>
        </React.Fragment>
    )
}

export default AddNewBlog;