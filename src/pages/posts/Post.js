import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";
import Avatar from "../../components/Avatar";
import { DropdownMenu } from "../../components/DropdownMenu";
import Badge from "react-bootstrap/Badge";
import { RiHeartsFill, RiHeartsLine, RiChat3Line } from "react-icons/ri";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { axiosReq } from "../../api/axiosDefault";
import CSSTransition from "react-transition-group/CSSTransition";
import UserFeedbackCue from "../../components/UserFeedbackCue";
import styles from "../../styles/Post.module.css";
import tagsStyles from "../../styles/GeneralPostsPage.module.css";

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
  const history = useHistory();
  const [showPostMsg, setShowPostMsg] = useState(false);

  const handleEdit = () => {
    history.push(`/posts/${id}/edit/`);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${id}/`);
      setShowPostMsg(true);
      setTimeout(() => history.push("/"), 2000);
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
    <CSSTransition in appear timeout={300} classNames="fade">
      <Card className={styles.Post}>
        {showPostMsg && (
          <UserFeedbackCue
            variant="Info"
            message="This post is being deleted...!"
          />
        )}
        <Card.Body>
          <Media className={styles.Container}>
            <Link to={`/profiles/${profile_id}`}>
              <Avatar src={profile_image} height={55} />
              {owner}
            </Link>
            <div className={styles.AvatarPos}>
              <span className={`${styles.UpdatedAt} ${styles.GentleShake}`}>
                {updated_at}
              </span>
              {is_owner && postPage && (
                <div className={styles.EditBtn}>
                  <DropdownMenu
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                  />
                </div>
              )}
            </div>
          </Media>
        </Card.Body>
        <Link to={`/posts/${id}/`}>
          <Card.Img src={image} alt={title} />
        </Link>
        <Card.Body>
          <Card.Title className="text-center">{title}</Card.Title>
          <Card.Text>{content}</Card.Text>
          {tags && (
            <Card.Text>
              <Badge variant="primary" className={tagsStyles.Tags}>
                <span>{tags}</span>
              </Badge>
            </Card.Text>
          )}
          <div>
            {is_owner ? (
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>You can&apos;t heart this!</Tooltip>}
              >
                <i className={styles.Icon}>
                  <RiHeartsLine />
                </i>
              </OverlayTrigger>
            ) : like_id ? (
              <span onClick={handleUnlike}>
                <i className={styles.LikedIcon}>
                  <RiHeartsFill />
                </i>
              </span>
            ) : currentUser ? (
              <span onClick={handleLike}>
                <i className={styles.Icon}>
                  <RiHeartsLine />
                </i>
              </span>
            ) : (
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Log in to heart this post!</Tooltip>}
              >
                <i className={styles.Icon}>
                  <RiHeartsLine />
                </i>
              </OverlayTrigger>
            )}
            {likes_total}
            <Link to={`/posts/${id}/`}>
              <i className={styles.Icon}>
                <RiChat3Line />
              </i>
            </Link>
            {comments_total}
          </div>
        </Card.Body>
      </Card>
    </CSSTransition>
  );
};

export default Post;
