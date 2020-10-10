import React from "react";
import Navbar from "./Navbar";
import FeaturedPost from "./FeaturedPost";
import Categories from "./Categories"
import SignupHeader from "./SignupHeader";


const LandingPage = ()=> {


return(
    <React.Fragment>
        <Navbar/>
        <FeaturedPost/>
        <Categories/>
        <SignupHeader/>
    </React.Fragment>
)

}

export default LandingPage;