import React from "react";
import { Link } from "react-router-dom";

const Toolbar = () => {
  return (
    <div>
      <Link to="/feed">My Feed</Link>
      <Link to="/liked">My Hearts</Link>
      <Link to="/posts/create">Create Post</Link>
    </div>
  );
};

export default Toolbar;
