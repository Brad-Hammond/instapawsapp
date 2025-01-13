import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMoreData } from "../../utils/utils";
import { axiosReq } from "../../api/axiosDefault";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import appStyles from "../../App.module.css";
import styles from "../../styles/Post.module.css";
import CSSTransition from "react-transition-group/CSSTransition";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Post from "./Post";
import Toolbar from "../../components/Toolbar";
import CommentCreateForm from "../comments/CommentCreateForm";
import Comment from "../comments/Comment";
import InfiniteScroll from "react-infinite-scroll-component";
import Asset from "../../components/Asset";
import PopularProfiles from "../profiles/PopularProfiles";
/*
  PostPage Component
  -------------------
  - Displays a detailed view of a single post along with its comments.

  Features:
  - Fetches post and comments data using `axiosReq` when the component mounts.
  - Manages state for the post (`post`) and its comments (`comments`).
  - Allows logged-in users to:
    1. Create a new comment via `CommentCreateForm`.
    2. Interact with comments (edit, delete) using the `Comment` component.
  - Implements infinite scroll for loading additional comments dynamically.
  - Includes fallback messages for when no comments are available.
  - Utilizes responsive layout with three columns:
    1. Toolbar and popular profiles on the left.
    2. Main post content and comments in the center.
    3. Additional widgets or space on the right (if needed).
  - Styled with `appStyles.Content` and other custom classes.
  - Implements smooth fade-in animation with `CSSTransition`.
*/

function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState({ results: [] });
  const [comments, setComments] = useState({ results: [] });
  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: post }, { data: comments }] = await Promise.all([
          axiosReq.get(`/posts/${id}/`),
          axiosReq.get(`/comments/?post=${id}`),
        ]);
        console.log("Post data:", post);
        console.log("Comments data:", comments);
        setPost({ results: [post] });
        setComments(comments);
      } catch (err) {
        console.error("Error fetching post or comments:", err);
      }
    };
  
    handleMount();
  }, [id]);

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

          <Col className="py-2 p-0 p-lg-2" lg={6}>
            <Container className={`${appStyles.Content} mb-2`}>
              <Post {...post.results[0]} setPosts={setPost} postPage />
            </Container>
            <Container className={appStyles.Content}>
              {currentUser ? (
                <CommentCreateForm
                  profileImage={profile_image}
                  profile_id={currentUser.profile_id}
                  post={id}
                  setPost={setPost}
                  setComments={setComments}
                />
              ) : comments.results.length ? (
                "Comments"
              ) : null}
              {comments.results.length ? (
                <InfiniteScroll
                  dataLength={comments.results.length}
                  loader={<Asset spinner />}
                  hasMore={!!comments.next}
                  next={() => fetchMoreData(comments, setComments)}
                >
                  {comments.results.map((comment) => (
                    <Comment
                      key={comment.id}
                      {...comment}
                      setPost={setPost}
                      setComments={setComments}
                    />
                  ))}
                </InfiniteScroll>
              ) : currentUser ? (
                <p className={`${styles.NoCommentsMsg} text-center`}>
                  It looks like there&apos;s no comments yet, start the
                  conversation?
                </p>
              ) : (
                <p className={styles.NoCommentsMsg}>
                  No comments yet, log in to comment!
                </p>
              )}
            </Container>
          </Col>
        </Row>
      </Container>
    </CSSTransition>
  );
}

export default PostPage;
