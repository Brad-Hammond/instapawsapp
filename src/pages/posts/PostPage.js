import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefault";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import appStyles from "../../App.module.css";
import styles from "../../styles/Post.module.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Post from "./Post";
import CommentCreateForm from "../comments/CommentCreateForm";
import Comment from "../comments/Comment";

function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState({ results: [] });
  const [comments, setComments] = useState({ results: [] });
  const currentUser = useCurrentUser();

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
    <Container>
      <Row>
        <Col className="py-2 p-0 p-lg-2" lg={3}>
          <div className={`${appStyles.Content} mb-3 mt-3`}>
          </div>
        </Col>
        <Col className="py-2 p-0 p-lg-2" lg={6}>
          <Container className={`${appStyles.Content} mb-2`}>
            <Post {...post.results[0]} setPosts={setPost} postPage />
          </Container>
          <Container className={appStyles.Content}>
            {currentUser ? (
              <CommentCreateForm
                profileImage={currentUser.profile_image}
                profile_id={currentUser.profile_id}
                post={id}
                setPost={setPost}
                setComments={setComments}
              />
            ) : (
              <p>Log in to leave a comment!</p>
            )}
            {comments.results.map((comment) => (
              <Comment
                key={comment.id}
                {...comment}
                setPost={setPost}
                setComments={setComments}
              />
            ))}
          </Container>
        </Col>
      </Row>
    </Container>
  );
}

export default PostPage;
