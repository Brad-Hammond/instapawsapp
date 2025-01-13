import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefault";
import styles from "../../styles/CommentCreateEditForm.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Avatar from "../../components/Avatar";
/*
  CommentCreateForm Component
  ----------------------------
  - Allows users to create a new comment for a post.

  Props:
  - profileImage: URL of the user's profile image.
  - profile_id: Unique identifier of the user's profile.
  - post: ID of the post being commented on.
  - setPost: Function to update the parent post's data.
  - setComments: Function to update the comments list.

  Features:
  - Manages input state for the comment text using `comment_info`.
  - Handles form submission:
    1. Sends the comment data to the API.
    2. Updates the comments list and the parent post's `comments_total` count safely.
    3. Clears the input field after successful submission.
  - Disables the submit button when the input field is empty.
  - Includes an avatar linked to the user's profile.
  - Styled using `styles.CommentEntryForm` and `styles.CommentButton`.
  - Validates props with `PropTypes` for type safety.
*/

function CommentCreateForm({ profileImage, profile_id, post, setPost, setComments }) {
  const [comment_info, setCommentInfo] = useState("");

  const handleChange = (e) => {
    setCommentInfo(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosRes.post("/comments/", {
        post,
        comment_info,
      });

      // Safely update comments list
      setComments((prevComments) => ({
        ...prevComments,
        results: [data, ...(prevComments?.results || [])],
      }));

      // Safely update the post's comments_total
      setPost((prevPost) => {
        if (!prevPost?.results?.length) {
          console.error("Post data is missing or invalid.");
          return prevPost;
        }

        const updatedPost = {
          ...prevPost.results[0],
          comments_total: (prevPost.results[0].comments_total || 0) + 1,
        };

        return {
          ...prevPost,
          results: [updatedPost],
        };
      });

      // Clear the input field
      setCommentInfo("");
    } catch (err) {
      console.error("Failed to create comment:", err);
    }
  };

  return (
    <Form className="mt-2 text-center" onSubmit={handleSubmit}>
      <Form.Group>
        <InputGroup>
          <p className="my-2">
            <Link to={`/profiles/${profile_id}`}>
              <Avatar src={profileImage} />
            </Link>
          </p>
          <Form.Control
            className={styles.CommentEntryForm}
            placeholder="Share your opinion here!"
            as="textarea"
            onChange={handleChange}
            value={comment_info}
            rows={2}
          />
        </InputGroup>
      </Form.Group>

      <Button
        className={styles.CommentButton}
        type="submit"
        disabled={!comment_info.trim()}
      >
        Post Comment
      </Button>
    </Form>
  );
}

// PropTypes validation
CommentCreateForm.propTypes = {
  profileImage: PropTypes.string.isRequired,
  profile_id: PropTypes.number.isRequired,
  post: PropTypes.number.isRequired,
  setPost: PropTypes.func.isRequired,
  setComments: PropTypes.func.isRequired,
};

export default CommentCreateForm;
