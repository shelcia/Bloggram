import React from 'react';
import Navbar from "./Navbar";



const Blogs= ({ match })=>{

    console.log( match.params.id);

    return(
        <React.Fragment>
            <Navbar/>
        </React.Fragment>
    )
}


export default Blogs;