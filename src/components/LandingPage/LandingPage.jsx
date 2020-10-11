import React from "react";
import Navbar from "./Navbar";
import FeaturedPost from "./FeaturedPost";
import Categories from "./Categories"
import SignupHeader from "./SignupHeader";
import Footer from "./Footer";


const LandingPage = ()=> {


return(
    <React.Fragment>
        <Navbar/>
        <FeaturedPost/>
        <Categories/>
        <SignupHeader/>
        <Footer/>
    </React.Fragment>
)

}

export default LandingPage;