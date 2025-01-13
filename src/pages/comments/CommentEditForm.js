import React, { useState } from "react";
import PropTypes from "prop-types";
import { axiosRes } from "../../api/axiosDefault";
import styles from "../../styles/CommentCreateEditForm.module.css";
import Form from "react-bootstrap/Form";
/*
  CommentEditForm Component
  --------------------------
  - Allows users to edit an existing comment.

  Props:
  - id: The unique identifier of the comment being edited.
  - comment_info: The initial content of the comment.
  - setShowEditForm: Function to toggle the visibility of the edit form.
  - setComments: Function to update the comments list.

  Features:
  - Manages the form input state with `formContent`, initialized with the current comment content.
  - Handles form submission:
    1. Sends the updated comment data to the API.
    2. Updates the corresponding comment in the comments list safely.
    3. Closes the edit form on successful submission.
  - Includes a "Cancel Edit" button to discard changes and hide the form.
  - Disables the "Update" button when the input is empty or contains only whitespace.
  - Styled using `styles.CommentEntryForm`, `styles.CancelCommentEditButton`, and `styles.CommentButton`.
*/

function CommentEditForm({ id, comment_info, setShowEditForm, setComments }) {
  const [formContent, setFormContent] = useState(comment_info);

  const handleChange = (event) => {
    setFormContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.put(`/comments/${id}/`, {
        comment_info: formContent.trim(),
      });
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.map((comment) => {
          return comment.id === id
            ? {
                ...comment,
                comment_info: formContent.trim(),
                updated_at: "now",
              }
            : comment;
        }),
      }));
      setShowEditForm(false);
    } catch (err) {
      return err;
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="pr-1">
        <Form.Control
          className={styles.CommentEntryForm}
          as="textarea"
          value={formContent}
          onChange={handleChange}
          rows={2}
        />
      </Form.Group>
      <div className="text-right">
        <button
          className={styles.CancelCommentEditButton}
          onClick={() => setShowEditForm(false)}
          type="button"
        >
          Cancel Edit
        </button>
        <button
          className={styles.CommentButton}
          disabled={!formContent.trim()}
          type="submit"
        >
          Update
        </button>
      </div>
    </Form>
  );
}

// PropTypes validation
CommentEditForm.propTypes = {
  id: PropTypes.number.isRequired,
  comment_info: PropTypes.string.isRequired,
  setShowEditForm: PropTypes.func.isRequired,
  setComments: PropTypes.func.isRequired,
};

export default CommentEditForm;
