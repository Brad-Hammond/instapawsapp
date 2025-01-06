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

    const handleLogOut = async () => {
        try {
          await axios.post("/dj-rest-auth/logout/");
          setCurrentUser(null);
        } catch (err) {
          console.error("Error logging out:", err);
        }
      };
}

export default NavBar;