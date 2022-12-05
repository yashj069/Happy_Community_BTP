import React from 'react';
import "./Header.css";
import logo from "../../images/logo.png";
import { NavLink } from "react-router-dom";

// import { MdNotifications } from 'react-icons/md';
const Header = (props) => {

    const logout= ()=>{
        window.location.reload();
    }
    return (
        <div className="header">
                <div className="logo">
                    <img src={logo} alt="no image found" style={{maxHeight:"50px"}}/>
                    </div>
                <div className="headerRight">
                <NavLink
                    className="navbar-item headerItems"
                    activeClassName="is-active"
                    to="/"
                    exact
                >
                    Home
                </NavLink>
                    <NavLink
                    className="navbar-item headerItems"
                    activeClassName="is-active"
                    to="/myInterests"
                    exact
                >
                    Interests
                </NavLink>
                    <NavLink
                    className="navbar-item headerItems"
                    activeClassName="is-active"
                    to="/myCommunities"
                    exact
                >
                    My Communities
                </NavLink>
                <NavLink
                    className="navbar-item headerItems"
                    activeClassName="is-active"
                    to="/contactus"
                    exact
                >
                    Contact Us
                </NavLink>
                    {/* <p className="headerItems"><MdNotifications/></p> */}
                    <p className="headerItems" onClick={logout}>Logout</p>
                </div>
        </div>
    );
};

export default Header;