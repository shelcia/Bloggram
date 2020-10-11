import React from 'react';
import { Link } from "react-router-dom";


const Categories = ()=>{

    const categories = [
        { id:"1", name:"Lifestyle", img:"https://picsum.photos/id/163/180/200", link:"lifestyle" },
        { id:"2", name:"Web Develpment", img:"https://picsum.photos/id/1/180/200", link:"webdev" },
        { id:"3", name:"Technology", img:"https://picsum.photos/id/160/180/200" , link:"technology"},
    ]

    return(
        <React.Fragment>
            <div className="container" style={{ marginTop:"2rem" }}>
                <h1 className="pb-3">Categories</h1>
                <div className="card-columns">
                    {categories.map((category)=>(
                    <div className="card" key={category.id}>
                        <img src={category.img} alt="" className="card-img-top" style={{filter: 'grayscale(100%)'}}/>
                        <div className="card-img-overlay">
                            <h4 className="card-title">{category.name}</h4>
                        <Link to = {`/category/${category.link}`} className="card-link">See More &#62;&#62; </Link>
                        </div>
                    </div>
                    ))}
                </div>
                <div className="text-right">
                    <Link to="/category" >See all Categories &#62;&#62;</Link>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Categories;