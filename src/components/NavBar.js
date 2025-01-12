import React from "react";
import { NavLink } from "react-router-dom";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";
import { removeTokenTimestamp } from "../utils/utils";
import { useCookies } from "react-cookie";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import axios from "axios";
import styles from "../styles/NavBar.module.css";
import Avatar from "./Avatar";
import { AiOutlineUser, AiOutlineLogout } from "react-icons/ai";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const [, , removeCookie] = useCookies(["refreshTokenTimestamp"]);
  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  const handleLogOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      removeCookie("refreshTokenTimestamp");
      removeCookie("profile_id");
      setExpanded(false);
      setCurrentUser(null);
      removeTokenTimestamp();
    } catch (err) {
      return err;
    }
  };

  const createPostIcon = (
    <NavLink
      className={({ isActive }) =>
        isActive ? `${styles.NavLink} ${styles.Active}` : styles.NavLink
      }
      to="/posts/create"
    ></NavLink>
  );

  const authIcons = (
    <>
      <NavDropdown
        title={
          <div className="expanded">
            <Avatar src={currentUser?.profile_image} height={40} />
            <span className="expanded">{currentUser?.username}</span>
          </div>
        }
        id="nav-dropdown"
      >
        <NavDropdown.Item className={styles.DropdownMenu}>
          <NavLink
            to={`/profiles/${currentUser?.profile_id}`}
            className={({ isActive }) =>
              isActive ? `${styles.NavLink} ${styles.Active}` : styles.NavLink
            }
          >
            <AiOutlineUser
              className={`${styles.NavbarExpandedIcons} ${styles.ProfileIcon}`}
              size={25}
            />
            My Profile
          </NavLink>
        </NavDropdown.Item>
        <NavDropdown.Item className={styles.DropdownMenu}>
          <NavLink
            className={styles.LogoutIcon}
            to="/"
            onClick={handleLogOut}
          >
            <AiOutlineLogout
              className={`${styles.NavbarExpandedIcons} ${styles.LogoutIcon}`}
              size={25}
            />
            Log out
          </NavLink>
        </NavDropdown.Item>
      </NavDropdown>
    </>
  );

  const unAuthIcons = (
    <>
      <NavLink
        className={({ isActive }) =>
          isActive ? `${styles.NavLink} ${styles.Active}` : styles.NavLink
        }
        to="/login"
      >
        <i className="fa-solid fa-right-to-bracket"></i>
        <span>Log In</span>
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? `${styles.NavLink} ${styles.Active}` : styles.NavLink
        }
        to="/signup"
      >
        <i className="fa-solid fa-person-circle-plus"></i>
        <span>Sign Up</span>
      </NavLink>
    </>
  );

  return (
    <Navbar
      expanded={expanded}
      className={styles.NavBar}
      expand="md"
      fixed="top"
    >
      <Container>
        <NavLink to="/" aria-label="instapaws home navbar title">
          <Navbar.Brand>
            <span>
              <strong>InstaPaws</strong>
            </span>
          </Navbar.Brand>
        </NavLink>
        {currentUser && createPostIcon}
        <Navbar.Toggle
          onClick={() => setExpanded(!expanded)}
          ref={ref}
          className={styles.ToggleButton}
          aria-controls="basic-navbar-nav"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <NavLink
              className={({ isActive }) =>
                isActive ? `${styles.NavLink} ${styles.Active}` : styles.NavLink
              }
              to="/"
            >
              <i className="fa-solid fa-house-chimney-window"></i>
              <span>Home</span>
            </NavLink>
            {currentUser ? authIcons : unAuthIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
