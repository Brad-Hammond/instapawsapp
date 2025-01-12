import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefault";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import appStyles from "../../App.module.css";
import styles from "../../styles/GeneralPostPage.module.css";
import CSSTransition from "react-transition-group/CSSTransition";
import { CgSearch } from "react-icons/cg";
import Badge from "react-bootstrap/Badge";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Asset from "../../components/Asset";
import Toolbar from "../../components/Toolbar.js";
import Post from "./Post";
import NoResultsImage from "../../assets/noImageFound.avif";
import InfiniteScroll from "react-infinite-scroll-component";
import PopularProfiles from "../profiles/PopularProfiles";
import { fetchMoreData } from "../../utils/utils";

function GeneralPostsPage({ message, filter = "" }) {
  const [posts, setPosts] = useState({ results: [] });
  const [tags, setTags] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();

  const currentUser = useCurrentUser();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axiosReq.get(
          `/posts/?${filter}search=${query}${
            tags !== null ? `&tags=${tags}` : ""
          }`
        );
        setPosts(data);
        setHasLoaded(true);
      } catch (err) {
        return err;
      }
    };

    setHasLoaded(false);
    const fetchTimer = setTimeout(() => {
      fetchPosts();
    }, 800);
    return () => {
      clearTimeout(fetchTimer);
    };
  }, [filter, query, pathname, currentUser, tags]);

  return (
    <CSSTransition
      in={true}
      appear={true}
      timeout={{ enter: 300 }}
      classNames="fade"
    >
      <Container>
        <Row>
          <Col className="py-2 p-0 p-lg-2" lg={3}>
            <Toolbar />
            <Container className={`${appStyles.Content} mb-3 mt-3`}>
              <PopularProfiles />
            </Container>
          </Col>
          <Col
            className="py-2 p-0 p-lg-2 d-flex flex-column align-items-center justify-content-start"
            lg={6}
          >
            <div className={styles.SearchContainer}>
              <CgSearch className={styles.SearchIcon} />
              <Form
                className={styles.SearchBar}
                onSubmit={(e) => e.preventDefault()}
              >
                <Form.Control
                  type="text"
                  className="mr-sm-2"
                  placeholder="Search..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </Form>
            </div>
            {hasLoaded ? (
              <>
                {posts.results.length ? (
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
                            ? post.content.slice(0, 200) + " ....."
                            : post.content
                        }
                        {...post}
                        setPosts={setPosts}
                      />
                    ))}
                  </InfiniteScroll>
                ) : (
                  <Container className={appStyles.Content}>
                    <Asset
                      className={styles.NoResultsImage}
                      src={NoResultsImage}
                      width={40}
                      height={40}
                      message={message}
                    />
                  </Container>
                )}
              </>
            ) : (
              <Container className={appStyles.Content}>
                <Asset spinner />
              </Container>
            )}
          </Col>

          <Col className="py-2 p-0 p-lg-2" lg={3}>
            <Container
              className={`${appStyles.Content} mb-3 mt-3 d-none d-lg-block`}
            >
              <p className={`${styles.PostTags} font-weight-bold text-center`}>
                <i className={`${styles.TagIcon} fas fa-tag`}></i> Search by Post Tags
              </p>
              <Badge
                variant="primary"
                pill
                className={`${styles.Tags}`}
                onClick={() => setTags(null)}
              >
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
    </CSSTransition>
  );
}

export default GeneralPostsPage;
