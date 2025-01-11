import React, { useState } from "react";
import { axiosRes } from "../../api/axiosDefault";
import styles from "../../styles/CommentCreateEditForm.module.css";
import Form from "react-bootstrap/Form";

function CommentEditForm(props) {
  const { id, comment_info, setShowEditForm, setComments } = props;
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
          disabled={!comment_info.trim()}
          type="submit"
        >
          Update
        </button>
      </div>
    </Form>
  );
}

export default CommentEditForm;