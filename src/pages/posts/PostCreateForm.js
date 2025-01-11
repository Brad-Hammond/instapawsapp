import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefault";
import { useRedirect } from "../../hooks/useRedirect";
import Asset from "../../components/Asset";
import Upload from "../../assets/upload-img.png";
import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import inputStyles from "../../styles/SignupLogIn.module.css";
import btnStyles from "../../styles/Button.module.css";
import formStyles from "../../styles/PostCreateEditForm.module.css";
import assetStyles from "../../styles/Asset.module.css";
import CSSTransition from "react-transition-group/CSSTransition";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";

function PostCreateForm() {
  useRedirect("loggedOut");
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

  const handleChange = (e) => {
    setPostData({
      ...postData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeImage = (e) => {
    if (e.target.files.length) {
      URL.revokeObjectURL(image);
      setPostData({
        ...postData,
        image: URL.createObjectURL(e.target.files[0]),
      });
    }
  };
}