import React, { useState } from "react";
import { axiosRes } from "../../api/axiosDefault";
import styles from "../../styles/CommentCreateEditForm.module.css";
import Form from "react-bootstrap/Form";

function CommentEditForm(props) {
  const { id, comment_info, setShowEditForm, setComments } = props;
  const [formContent, setFormContent] = useState(comment_info);
}