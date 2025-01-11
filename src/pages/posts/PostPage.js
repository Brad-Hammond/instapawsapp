import React from "react";
import { useParams } from "react-router-dom";

function PostPage() {
  const { id } = useParams();

  return (
    <div>
      <h1>Post Page for ID: {id}</h1>
    </div>
  );
}

export default PostPage;
