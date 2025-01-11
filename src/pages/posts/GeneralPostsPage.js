import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import { axiosReq } from "../../api/axiosDefaults";
import { fetchMoreData } from "../../utils/utils";
import Asset from "../../components/Asset";
import Toolbar from "../../components/Toolbar";
import PopularProfiles from "../profiles/PopularProfiles";
import Post from "./Post";
import appStyles from "../../App.module.css";
import styles from "../../styles/GeneralPostsPage.module.css";

function GeneralPostsPage() {
  const [posts, setPosts] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const [query, setQuery] = useState("");
  const [tags, setTags] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axiosReq.get(
          `/posts/?search=${query}${tags ? `&tags=${tags}` : ""}`
        );
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
  }, [query, tags]);

  return (
    <Container>
      <Row>
        <Col lg={3}>
          <Toolbar />
          <Container className={`${appStyles.Content} mb-3 mt-3`}>
            <PopularProfiles />
          </Container>
        </Col>
        <Col lg={6}>
          <Form className={styles.SearchBar} onSubmit={(e) => e.preventDefault()}>
            <Form.Control
              type="text"
              className="mr-sm-2"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </Form>
          {hasLoaded ? (
            <InfiniteScroll
              dataLength={posts.results.length}
              loader={<Asset spinner />}
              hasMore={!!posts.next}
              next={() => fetchMoreData(posts, setPosts)}
            >
              {posts.results.map((post) => (
                <Post
                  key={post.id}
                  content={
                    post.content.length > 200
                      ? post.content.slice(0, 200) + "..."
                      : post.content
                  }
                  {...post}
                  setPosts={setPosts}
                />
              ))}
            </InfiniteScroll>
          ) : (
            <Asset spinner />
          )}
        </Col>
        <Col lg={3}>
          <Container className={`${appStyles.Content} mb-3 mt-3 d-none d-lg-block`}>
            <p className={`${styles.PostTags} font-weight-bold text-center`}>
              <i className={`${styles.TagIcon} fas fa-tag`}></i> Search by Post Tags
            </p>
            <Badge variant="primary" pill className={`${styles.Tags}`} onClick={() => setTags(null)}>
            All Tags
              </Badge>
              <Badge
                variant="primary"
                pill
                className={`${styles.Tags}`}
                onClick={() => setTags("Puppies")}
              >
                Puppies
              </Badge>
              <Badge
                variant="primary"
                pill
                className={`${styles.Tags}`}
                onClick={() => setTags("Training")}
              >
                Training
              </Badge>
              <Badge
                variant="primary"
                pill
                className={`${styles.Tags}`}
                onClick={() => setTags("Health")}
              >
                Health
              </Badge>
              <Badge
                variant="primary"
                pill
                className={`${styles.Tags} `}
                onClick={() => setTags("Grooming")}
              >
                Grooming
              </Badge>
              <Badge
                variant="primary"
                pill
                className={`${styles.Tags}`}
                onClick={() => setTags("Adoption")}
              >
                Adoption
              </Badge>
              <Badge
                variant="primary"
                pill
                className={`${styles.Tags}`}
                onClick={() => setTags("Nutrition")}
              >
                Nutrition
              </Badge>
              <Badge
                variant="primary"
                pill
                className={`${styles.Tags}`}
                onClick={() => setTags("Toys")}
              >
                Toys
              </Badge>
              <Badge
                variant="primary"
                pill
                className={`${styles.Tags}`}
                onClick={() => setTags("Walks")}
              >
                Walks
              </Badge>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}

export default GeneralPostsPage;
