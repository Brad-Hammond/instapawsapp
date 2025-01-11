import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import appStyles from "../../App.module.css";
import styles from "../../styles/Post.module.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

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
    <Container>
      <Row>
        <Col className="py-2 p-0 p-lg-2" lg={3}>
          <div className={`${appStyles.Content} mb-3 mt-3`}>
          </div>
        </Col>
        <Col className="py-2 p-0 p-lg-2" lg={6}>
          <Container className={`${appStyles.Content} mb-2`}>
            <h2>Post Content</h2>
            <pre>{JSON.stringify(post.results[0], null, 2)}</pre>
          </Container>
          <Container className={appStyles.Content}>
            <h2>Comments</h2>
            <pre>{JSON.stringify(comments.results, null, 2)}</pre>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}

export default PostPage;
