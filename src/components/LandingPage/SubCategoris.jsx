import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { LoadPost } from "../actions/index";
import LinesEllipsis from 'react-lines-ellipsis';
import Like from "../../assets/like.png";
import Dislike from "../../assets/dislike.png";
import Heart from "../../assets/heart.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const SubCategoriesPage = ({ match }) =>{

    const LINK = process.env.REACT_APP_HEROKU_LINK;
    const dispatch = useDispatch();
    // console.log(blogs);

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


    const Categories = [
        { id:"1", name:"Lifestyle", img:"https://picsum.photos/id/163/180/200", link:"lifestyle" },
        { id:"2", name:"Web Development", img:"https://picsum.photos/id/1/180/200", link:"webdev" },
        { id:"3", name:"Technology", img:"https://picsum.photos/id/160/180/200" , link:"technology"},
        { id:"4", name:"Architecture", img:"https://picsum.photos/id/405/180/200" , link:"architecture"},
        { id:"5", name:"Fashion Design", img:"https://picsum.photos/id/513/180/200" , link:"fashiondesign"},
        { id:"6", name:"Automobile", img:"https://picsum.photos/id/514/180/200" , link:"automobile"},
        { id:"7", name:"Others", img:"https://picsum.photos/id/528/180/200" , link:"others"},
    ]
    const topic = Categories.filter((category)=>category.link === match.params.id)
    // console.log('topic',topic[0].name);
    const allPost = useSelector((state) => state.posts);
    // console.log('allPost',allPost);
    const blogs = allPost.filter((post)=> post.category === topic[0].name);
    // console.log('blogs',blogs);


    return(
        <React.Fragment>
            <ToastContainer/>
            <Navbar/>
            <div className="container" id="container" style={{width:"450px"}}>
                <div className="text-center">
                    <div className="card-deck">
                    {topic.map((category)=>(
                        <h1 key={category.id} >{category.name}</h1>
                    ))}
                   
                    </div>
                </div>
                <hr></hr>
                <div style={{ flexDirection: "column-reverse" }} className="d-flex">
                {blogs.map((post)=>(
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
            </div>
        </React.Fragment>
    )
}


export default SubCategoriesPage;