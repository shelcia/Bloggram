import React from "react";
import {NavLink} from "react-router-dom";


const Navbar = () => {

    return (
        <React.Fragment>
            <nav className="navbar navbar-expand-md bg-light navbar-light fixed-top">
                <NavLink className="navbar-brand pl-5" to="/">Blog Gram</NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="collapsibleNavbar">
                    <ul className="navbar-nav ml-auto pr-5">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/blog">Blogs</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/login">Login</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </React.Fragment>
    )
}


export default Navbar;