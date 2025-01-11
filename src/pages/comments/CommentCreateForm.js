import React, { useState } from "react";
import { Link } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import styles from "../../styles/CommentCreateEditForm.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Avatar from "../../components/Avatar";

function CommentCreateForm(props) {
  const { profileImage, profile_id, post, setPost, setComments } = props;
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
      setComments((prevComments) => ({
        ...prevComments,
        results: [data, ...prevComments.results],
      }));
      setPost((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            comments_total: prevPost.results[0].comments_total + 1,
          },
        ],
      }));
      setCommentInfo("");
    } catch (err) {
      return err;
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
            placeholder="share your opinion here!"
            as="textarea"
            onChange={handleChange}
            value={comment_info}
            rows={2}
          />
        </InputGroup>
      </Form.Group>

      <Button className={styles.CommentButton} type="submit">
        Post Comment
      </Button>
    </Form>
  );
}

export default CommentCreateForm;