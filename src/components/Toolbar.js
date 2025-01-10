import React from "react";
import { Link, useLocation } from "react-router-dom";
import { MdOutlineLibraryAdd, MdOutlineSportsHandball } from "react-icons/md";
import { RiHeartsFill } from "react-icons/ri";
import styles from "../styles/Toolbar.module.css";
import Container from "react-bootstrap/Container";

const Toolbar = () => {
  const { pathname } = useLocation();
  return (
    <Container className={styles.Toolbar}>
      <Link to="/feed" className={pathname === "/feed" ? styles.active : null}>
        <MdOutlineSportsHandball className={styles.Icon} /> My Feed
      </Link>
      <Link
        to="/liked"
        className={pathname === "/liked" ? styles.active : null}
      >
        <RiHeartsFill className={styles.Icon} /> My Hearts
      </Link>
      <Link
        to="/posts/create"
        className={pathname === "/posts/create" ? styles.active : null}
      >
        <MdOutlineLibraryAdd className={styles.Icon} /> Create Post
      </Link>
    </Container>
  );
};

export default Toolbar;
