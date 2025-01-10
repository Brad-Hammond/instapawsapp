import React from "react";
import { Link, useLocation } from "react-router-dom";
import { MdOutlineLibraryAdd, MdOutlineSportsHandball } from "react-icons/md";
import { RiHeartsFill } from "react-icons/ri";

const Toolbar = () => {
  const { pathname } = useLocation();
  return (
    <div>
      <Link to="/feed" className={pathname === "/feed" ? "active" : null}>
        <MdOutlineSportsHandball /> My Feed
      </Link>
      <Link to="/liked" className={pathname === "/liked" ? "active" : null}>
        <RiHeartsFill /> My Hearts
      </Link>
      <Link
        to="/posts/create"
        className={pathname === "/posts/create" ? "active" : null}
      >
        <MdOutlineLibraryAdd /> Create Post
      </Link>
    </div>
  );
};

export default Toolbar;
