import React, { useState } from "react";
import { useParams } from "react-router-dom";

function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState({ results: [] });
  const [comments, setComments] = useState({ results: [] });

  return (
    <div>
      <h1>Post Page for ID: {id}</h1>
      <div>
        <h2>Post Data:</h2>
        <pre>{JSON.stringify(post, null, 2)}</pre>
      </div>
      <div>
        <h2>Comments:</h2>
        <pre>{JSON.stringify(comments, null, 2)}</pre>
      </div>
    </div>
  );
}

export default PostPage;
