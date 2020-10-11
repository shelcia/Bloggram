import React from 'react';

import AuthBlog from "./AuthBlog";
import OpenBlog from "./OpenBlog";


const Blogs= ({ match })=>{

    const token = localStorage.getItem('BlogGram-Token'); 

    return(
        <React.Fragment>
            {token ? (
              <AuthBlog match={match}/>
            ):(
              <OpenBlog match={match}/>
            ) 
            }
            
        </React.Fragment>
    )
}


export default Blogs;