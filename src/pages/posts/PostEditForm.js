import React, { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import inputStyles from "../../styles/SignupLogIn.module.css";
import btnStyles from "../../styles/Button.module.css";
import formStyles from "../../styles/PostCreateEditForm.module.css";
import { CSSTransition } from "react-transition-group";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";

function PostEditForm() {
  const [errors, setErrors] = useState({});

  const [postData, setPostData] = useState({
    title: "",
    tags: "",
    content: "",
    image: "",
  });

  const { title, tags, content, image } = postData;

  const imageInput = useRef(null);
  const history = useHistory();
  const { id } = useParams();
}