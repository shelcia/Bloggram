import React from "react";
import { NavLink, useHistory } from "react-router-dom";


const Navbar = () => {

    const history = useHistory();

    const logout = (e) => {

        e.preventDefault();
        const PREFIX = 'BlogGram-'
        localStorage.removeItem(`${PREFIX}UserId`);
        localStorage.removeItem(`${PREFIX}Token`);
        localStorage.removeItem(`${PREFIX}Email`);
        localStorage.removeItem(`${PREFIX}name`);
        history.push('/');
    }

    return (
        <React.Fragment>
            <nav className="navbar navbar-expand-md bg-light navbar-light fixed-top">
                <NavLink className="navbar-brand pl-5" to="/dashboard/feed">BlogGram</NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="collapsibleNavbar">
                    <ul className="navbar-nav ml-auto pr-5">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/dashboard/feed">Feed</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/dashboard/myblogs">My Blogs</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/dashboard/myprofile">My Profile</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/" onClick={(e)=>logout(e)}>Logout</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </React.Fragment>
    )
}


export default Navbar;