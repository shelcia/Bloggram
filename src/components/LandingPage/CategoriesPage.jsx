import React from 'react';
import { Link } from "react-router-dom";
import Navbar from "./Navbar";


const CategoriesPage = () =>{

    const firstColumn = [
        { id:"1", name:"Lifestyle", img:"https://picsum.photos/id/163/180/200", link:"lifestyle" },
        { id:"2", name:"Web Development", img:"https://picsum.photos/id/1/180/200", link:"webdev" },
        { id:"3", name:"Technology", img:"https://picsum.photos/id/160/180/200" , link:"technology"},
    ]
    const secondColumn = [
        { id:"4", name:"Architecture", img:"https://picsum.photos/id/405/180/200" , link:"architecture"},
        { id:"5", name:"Fashion Design", img:"https://picsum.photos/id/513/180/200" , link:"fashiondesign"},
        { id:"6", name:"Automobile", img:"https://picsum.photos/id/514/180/200" , link:"automobile"},
    ]
     const thirdColumn = [
        { id:"7", name:"Others", img:"https://picsum.photos/id/528/180/200" , link:"others"},
    ]

    return(
        <React.Fragment>
            <Navbar/>
            <div className="container" id="container">
                <h1 className="pb-3">All Categories</h1>
                <hr></hr>
                <div className="card-columns">
                    {firstColumn.map((category)=>(
                    <div className="card" key={category.id}>
                        <img src={category.img} alt="" className="card-img-top" style={{filter: 'grayscale(100%)'}}/>
                        <div className="card-img-overlay">
                            <h4 className="card-title">{category.name}</h4>
                        <Link to = {`/category/${category.link}`} className="card-link">See More &#62;&#62; </Link>
                        </div>
                    </div>
                    ))}
                </div>
                 <div className="card-columns">
                    {secondColumn.map((category)=>(
                    <div className="card" key={category.id}>
                        <img src={category.img} alt="" className="card-img-top" style={{filter: 'grayscale(100%)'}}/>
                        <div className="card-img-overlay">
                            <h4 className="card-title">{category.name}</h4>
                        <Link to = {`/category/${category.link}`} className="card-link">See More &#62;&#62; </Link>
                        </div>
                    </div>
                    ))}
                </div>
                <div className="card-columns">
                    {thirdColumn.map((category)=>(
                    <div className="card" key={category.id}>
                        <img src={category.img} alt="" className="card-img-top" style={{filter: 'grayscale(100%)'}}/>
                        <div className="card-img-overlay">
                            <h4 className="card-title">{category.name}</h4>
                        <Link to = {`/category/${category.link}`} className="card-link">See More &#62;&#62; </Link>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </React.Fragment>
    )
}


export default CategoriesPage;