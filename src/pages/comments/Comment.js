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
}