import React, { useState } from "react";
import { Link } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefault";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import styles from "../../styles/Comment.module.css";
import Avatar from "../../components/Avatar";
import Media from "react-bootstrap/Media";
import { DropdownMenu } from "../../components/DropdownMenu";
import CommentEditForm from "./CommentEditForm";
import UserFeedbackCue from "../../components/UserFeedbackCue";

const Comment = (props) => {
  const {
    profile_id,
    profile_image,
    owner,
    updated_at,
    comment_info,
    id,
    setPost,
    setComments,
  } = props;

  const currentUser = useCurrentUser();
  const [showEditForm, setShowEditForm] = useState(false);
  const is_owner = currentUser?.username === owner;
  const [showCommentMsg, setCommentMsg] = useState(false);
  const [wasDeleted, setWasDeleted] = useState(false);

  const handleDelete = async () => {
    setWasDeleted(true);
    setTimeout(async () => {
      try {
        await axiosRes.delete(`/comments/${id}/`);
        setPost((prevPost) => ({
          results: [
            {
              ...prevPost.results[0],
              comments_total: prevPost.results[0].comments_total - 1,
            },
          ],
        }));

        setComments((prevComments) => ({
          ...prevComments,
          results: prevComments.results.filter((comment) => comment.id !== id),
        }));
      } catch (err) {
        return err;
      }
    }, 2000);
  };

  return wasDeleted ? (
    <UserFeedbackCue variant="Info" message="Comment deleted!" />
  ) : (
    <div>
      {showCommentMsg && (
        <UserFeedbackCue variant="Info" message="Comment edited!" />
      )}

      <Media>
        <Link to={`/profiles/${profile_id}`} className="my-2">
          <Avatar src={profile_image} />
        </Link>
        <Media.Body className="align-self-center mb-4">
          <div className={styles.CommentSection}>
            <span className={styles.CommentUsername}>{owner}</span>
            <span className={styles.Date}> ~ {updated_at} </span>
            <span className={styles.DropdownMenu}>
              {is_owner && !showEditForm && (
                <DropdownMenu
                  handleEdit={() => setShowEditForm(true)}
                  handleDelete={handleDelete}
                />
              )}
            </span>
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
            <p>{comment_info}</p>
          )}
        </Media.Body>
      </Media>
    </div>
  );
};

export default Comment;