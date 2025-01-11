import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefault";

function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState({ results: [] });
  const [comments, setComments] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: post }, { data: comments }] = await Promise.all([
          axiosReq.get(`/posts/${id}/`),
          axiosReq.get(`/comments/?post=${id}`),
        ]);
        setPost({ results: [post] });
        setComments(comments);
      } catch (err) {
        console.error(err);
      }
    };

    handleMount();
  }, [id]);

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
