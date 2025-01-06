import React from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { AiOutlineUser, AiOutlineLogout } from "react-icons/ai";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

const NavBar = () => {
    const currentUser = null;
    const setCurrentUser = () => {};
    
    // logout handler
    const handleLogOut = async () => {
        try {
          await axios.post("/dj-rest-auth/logout/");
          setCurrentUser(null);
        } catch (err) {
          console.error("Error logging out:", err);
        }
      };

    // Icon for creating new post
    const createPostIcon = (
        <NavLink to="/posts/create">
          <i className="fa-solid fa-plus"></i>
          <span>Create Post</span>
        </NavLink>
      );
}

export default NavBar;