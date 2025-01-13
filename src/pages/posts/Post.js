import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Avatar from "../../components/Avatar";
import { DropdownMenu } from "../../components/DropdownMenu";
import Badge from "react-bootstrap/Badge";
import { RiHeartsFill, RiHeartsLine, RiChat3Line } from "react-icons/ri";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { axiosReq } from "../../api/axiosDefault";
import { CSSTransition } from "react-transition-group";
import UserFeedbackCue from "../../components/UserFeedbackCue";
/*
  Post Component
  ---------------
  - Displays a single post with options for viewing, editing, deleting, liking, and unliking.

  Props:
  - id, title, image, content: Basic details of the post.
  - owner, profile_id, profile_image: Information about the post's creator.
  - postPage: Indicates if the component is rendered on a standalone post page.
  - likes_total, like_id: Data for tracking and toggling likes.
  - comments_total: Total number of comments on the post.
  - tags: Tags associated with the post.
  - updated_at: Last updated timestamp for the post.
  - setPosts: Function to update the list of posts.

  Features:
  - Allows the post owner to edit or delete the post (`handleEdit`, `handleDelete`).
  - Handles like and unlike actions, updating the state dynamically (`handleLike`, `handleUnlike`).
  - Includes a feedback cue (`UserFeedbackCue`) to notify users when a post is being deleted.
  - Displays avatar, post title, content, tags, likes, and comments count.
  - Provides responsive interactivity with buttons for likes, comments, and user navigation.
  - Styled with `Card` and Bootstrap components, with animations via `CSSTransition`.
*/

const Post = ({
  id,
  title,
  image,
  content,
  owner,
  profile_id,
  profile_image,
  postPage,
  likes_total,
  like_id,
  comments_total,
  tags,
  updated_at,
  setPosts,
}) => {
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const navigate = useNavigate();
  const [showPostMsg, setShowPostMsg] = useState(false);

  const nodeRef = useRef(null);

  const handleEdit = () => {
    navigate(`/posts/${id}/edit/`);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${id}/`);
      setShowPostMsg(true);
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLike = async () => {
    try {
      const { data } = await axiosReq.post("/likes/", { post: id });
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) =>
          post.id === id
            ? { ...post, likes_total: post.likes_total + 1, like_id: data.id }
            : post
        ),
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleUnlike = async () => {
    try {
      await axios.delete(`/likes/${like_id}/`);
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) =>
          post.id === id
            ? { ...post, likes_total: post.likes_total - 1, like_id: null }
            : post
        ),
      }));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <CSSTransition in appear timeout={300} classNames="fade" nodeRef={nodeRef}>
      <Card ref={nodeRef}>
        {showPostMsg && (
          <UserFeedbackCue
            variant="info"
            message="This post is being deleted..."
          />
        )}
        <Card.Body>
          <Row>
            <Col xs={2}>
              <Link to={`/profiles/${profile_id}`}>
                <Avatar src={profile_image} height={55} />
              </Link>
            </Col>
            <Col xs={10}>
              <Link to={`/profiles/${profile_id}`}>{owner}</Link>
              {is_owner && postPage && (
                <DropdownMenu
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              )}
            </Col>
          </Row>
        </Card.Body>
        <Link to={`/posts/${id}/`}>
          <Card.Img src={image} alt={title} />
        </Link>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{content}</Card.Text>
          {tags && (
            <Card.Text>
              <Badge>{tags}</Badge>
            </Card.Text>
          )}
          <div>
            {is_owner ? (
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>You can&apos;t heart this!</Tooltip>}
              >
                <i>
                  <RiHeartsLine />
                </i>
              </OverlayTrigger>
            ) : like_id ? (
              <span onClick={handleUnlike}>
                <RiHeartsFill />
              </span>
            ) : (
              <span onClick={handleLike}>
                <RiHeartsLine />
              </span>
            )}
            {likes_total}
            <Link to={`/posts/${id}/`}>
              <RiChat3Line />
            </Link>
            {comments_total}
          </div>
        </Card.Body>
      </Card>
    </CSSTransition>
  );
};

// PropTypes validation
Post.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  profile_id: PropTypes.number.isRequired,
  profile_image: PropTypes.string.isRequired,
  postPage: PropTypes.bool,
  likes_total: PropTypes.number.isRequired,
  like_id: PropTypes.number,
  comments_total: PropTypes.number.isRequired,
  tags: PropTypes.string,
  updated_at: PropTypes.string.isRequired,
  setPosts: PropTypes.func.isRequired,
};

export default Post;
