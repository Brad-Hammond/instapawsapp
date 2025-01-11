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
}