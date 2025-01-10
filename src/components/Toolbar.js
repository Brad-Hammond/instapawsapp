import React from "react";
import { Link, useLocation } from "react-router-dom";

const Toolbar = () => {
  const { pathname } = useLocation();
  return (
    <div>
      <Link to="/feed" className={pathname === "/feed" ? "active" : null}>
        My Feed
      </Link>
      <Link to="/liked" className={pathname === "/liked" ? "active" : null}>
        My Hearts
      </Link>
      <Link
        to="/posts/create"
        className={pathname === "/posts/create" ? "active" : null}
      >
        Create Post
      </Link>
    </div>
  );
};

export default Toolbar;
