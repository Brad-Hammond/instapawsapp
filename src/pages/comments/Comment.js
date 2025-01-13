import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefault";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import styles from "../../styles/Comment.module.css";
import Avatar from "../../components/Avatar";
import { DropdownMenu } from "../../components/DropdownMenu";
import CommentEditForm from "./CommentEditForm";
import UserFeedbackCue from "../../components/UserFeedbackCue";
import Card from "react-bootstrap/Card";

const Comment = ({
  profile_id,
  profile_image,
  owner,
  updated_at,
  comment_info,
  id,
  setPost,
  setComments,
}) => {
  const currentUser = useCurrentUser();
  const [showEditForm, setShowEditForm] = useState(false);
  const is_owner = currentUser?.username === owner;
  const [wasDeleted, setWasDeleted] = useState(false);
  const [showCommentMsg, setCommentMsg] = useState(false);

  const handleDelete = async () => {
    setWasDeleted(true);
    setTimeout(async () => {
      try {
        await axiosRes.delete(`/comments/${id}/`);

        setPost((prevPost) => {
          if (!prevPost || !prevPost.results || !prevPost.results[0]) {
            console.error("Post data is missing or invalid.");
            return prevPost;
          }

          const updatedPost = {
            ...prevPost.results[0],
            comments_total: Math.max((prevPost.results[0].comments_total || 0) - 1, 0),
          };

          return {
            results: [updatedPost],
          };
        });

        setComments((prevComments) => ({
          ...prevComments,
          results: prevComments?.results?.filter((comment) => comment.id !== id) || [],
        }));
      } catch (err) {
        console.error("Failed to delete the comment:", err);
      }
    }, 2000);
  };

  return wasDeleted ? (
    <UserFeedbackCue variant="Info" message="Comment deleted!" />
  ) : (
    <Card className={styles.CommentCard}>
      {showCommentMsg && (
        <UserFeedbackCue variant="Info" message="Comment edited!" />
      )}
      <Card.Body className="d-flex">
        <div className="mr-3">
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} alt={`${owner}'s avatar`} />
          </Link>
        </div>
        <div className="flex-grow-1">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <strong className={styles.CommentUsername}>{owner}</strong>{" "}
              <span className={styles.Date}>~ {updated_at}</span>
            </div>
            {is_owner && !showEditForm && (
              <DropdownMenu
                handleEdit={() => setShowEditForm(true)}
                handleDelete={handleDelete}
              />
            )}
          </div>
          {showEditForm ? (
            <CommentEditForm
              id={id}
              profile_id={profile_id}
              profile_image={profile_image}
              comment_info={comment_info}
              setComments={setComments}
              setShowEditForm={setShowEditForm}
              setCommentMsg={setCommentMsg}
            />
          ) : (
            <p className={styles.CommentContent}>{comment_info}</p>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

// PropTypes validation
Comment.propTypes = {
  profile_id: PropTypes.number.isRequired,
  profile_image: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  updated_at: PropTypes.string.isRequired,
  comment_info: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  setPost: PropTypes.func.isRequired,
  setComments: PropTypes.func.isRequired,
};

export default Comment;
