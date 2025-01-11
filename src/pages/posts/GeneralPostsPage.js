import React, { useState, useEffect } from "react";
import { Container, Form } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import { axiosReq } from "../../api/axiosDefault";
import { fetchMoreData } from "../../utils/utils";
import Asset from "../../components/Asset";
import Post from "./Post";

function GeneralPostsPage() {
  const [posts, setPosts] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/?search=${query}`);
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
  }, [query]);

  return (
    <Container>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Form.Control
          type="text"
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
    </Container>
  );
}

export default GeneralPostsPage;
