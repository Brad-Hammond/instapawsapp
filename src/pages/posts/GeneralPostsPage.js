import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefault";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function GeneralPostsPage({ message, filter = "" }) {
  const [posts, setPosts] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/?${filter}search=${query}`);
        setPosts(data);
        setHasLoaded(true);
      } catch (err) {
        console.error(err);
      }
    };

    setHasLoaded(false);
    const fetchTimer = setTimeout(() => {
      fetchPosts();
    }, 800);
    return () => clearTimeout(fetchTimer);
  }, [filter, query, pathname]);

  return (
    <Container>
      <Row>
        <Col lg={3}></Col>
        <Col lg={6}>
          <h1>General Posts</h1>
          <p>Search and view posts here.</p>
        </Col>
        <Col lg={3}></Col>
      </Row>
    </Container>
  );
}

export default GeneralPostsPage;
