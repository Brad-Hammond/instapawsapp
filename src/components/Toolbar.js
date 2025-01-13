import React from "react";
import { Link, useLocation } from "react-router-dom";
import { MdOutlineLibraryAdd, MdOutlineSportsHandball } from "react-icons/md";
import { RiHeartsFill } from "react-icons/ri";
import styles from "../styles/Toolbar.module.css";
import Container from "react-bootstrap/Container";
import ScrollToTopButton from "./ScrollToTopButton";
/*
  Toolbar Component
  ------------------
  - Provides navigation links for the main sections of the application: My Feed, My Hearts, and Create Post.

  Features:
  - Highlights the active path using `useLocation` to match the current `pathname` with custom styles.
  - Includes icons for each link (using Material Design and Remix Icon libraries) for better visual representation.
  - Integrates the `ScrollToTopButton` component for easy navigation to the top of the page.
  - Styled using `styles.ToolbarPlacement`, `styles.ToolbarLink`, and `styles.ActivePath` for layout and active link indication.
*/

const Toolbar = () => {
  const { pathname } = useLocation();

  return (
    <Container
      className={`${styles.ToolbarPlacement} mt-4`}
    >
      <Link
        to="/feed"
        className={`${styles.ToolbarLink} ${
          pathname === "/feed" ? styles.ActivePath : ""
        }`}
      >
        <MdOutlineSportsHandball className={styles.Icon} /> My Feed
      </Link>
      <Link
        to="/liked"
        className={`${styles.ToolbarLink} ${
          pathname === "/liked" ? styles.ActivePath : ""
        }`}
      >
        <RiHeartsFill className={`${styles.Icon} ${styles.HeartIcon}`} /> My
        Hearts
      </Link>
      <Link
        to="/posts/create"
        className={`${styles.ToolbarLink} ${
          pathname === "/posts/create" ? styles.ActivePath : ""
        }`}
      >
        <MdOutlineLibraryAdd
          className={`${styles.Icon} ${styles.CreatePostIcon}`}
        />{" "}
        Create Post
      </Link>
      <ScrollToTopButton />
    </Container>
  );
};

export default Toolbar;
