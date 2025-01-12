import React, { useEffect, useRef, useState } from "react"; // Added useRef
import { useNavigate, useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefault";
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
  const navigate = useNavigate();
  const { id } = useParams();

  // Step 1: Create a ref for the CSSTransition node
  const nodeRef = useRef(null);

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/${id}/`);
        const { is_owner, title, tags, content, image } = data;

        is_owner
          ? setPostData({ title, tags, content, image })
          : navigate("/");
      } catch (err) {
        console.error(err);
      }
    };
    handleMount();
  }, [id, navigate]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("tags", tags);
    formData.append("content", content);

    if (imageInput?.current?.files[0]) {
      formData.append("image", imageInput.current.files[0]);
    }

    try {
      await axiosReq.put(`/posts/${id}/`, formData);
      navigate(`/posts/${id}/`);
    } catch (err) {
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const textFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label>Change title?</Form.Label>
        {errors.title?.map((message, idx) => (
          <Alert variant="warning" className={styles.AlertStyles} key={idx}>
            {message}
          </Alert>
        ))}
        <Form.Control
          type="text"
          name="title"
          className={`${formStyles.Form} ${inputStyles.Input}`}
          value={title}
          onChange={handleChange}
          aria-label="title"
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Change Tag?</Form.Label>
        {errors.tags?.map((message, idx) => (
          <Alert variant="warning" className={styles.AlertStyles} key={idx}>
            {message}
          </Alert>
        ))}
        <Form.Control
          as="select"
          name="tags"
          className={`${formStyles.Form}`}
          value={tags}
          onChange={handleChange}
          aria-label="tags"
        >
          <option>Select your tag!</option>
          <option value="Puppies">Puppies</option>
          <option value="Training">Training</option>
          <option value="Health">Health</option>
          <option value="Grooming">Grooming</option>
          <option value="Adoption">Adoption</option>
          <option value="Nutrition">Nutrition</option>
          <option value="Toys">Toys</option>
          <option value="Walks">Walks</option>
        </Form.Control>
      </Form.Group>

      <Form.Group>
        <Form.Label>Edit your description?</Form.Label>
        <Form.Control
          as="textarea"
          rows={5}
          name="content"
          className={`${formStyles.Form} ${inputStyles.Input}`}
          value={content}
          onChange={handleChange}
          aria-label="post content"
        />
      </Form.Group>
      {errors.content?.map((message, idx) => (
        <Alert variant="warning" className={styles.AlertStyles} key={idx}>
          {message}
        </Alert>
      ))}

      <Button className={btnStyles.Button} type="submit">
        Save Edit
      </Button>

      <Button
        className={`${btnStyles.CancelButton} mx-3`}
        onClick={() => navigate(-1)}
      >
        Cancel Edit
      </Button>
    </div>
  );

  return (
    <CSSTransition
      in={true}
      appear={true}
      timeout={{ enter: 300 }}
      classNames="fade"
      nodeRef={nodeRef} // Step 2: Pass nodeRef to CSSTransition
    >
      <Form onSubmit={handleSubmit} ref={nodeRef}> {/* Step 3: Attach ref to the parent DOM node */}
        <Row>
          <Col md={7} lg={8} className="d-none d-md-block p-0 p-md-2">
            <Container className={appStyles.Content}>{textFields}</Container>
          </Col>
          <Col className="py-2 p-0 p-md-2" md={5} lg={4}>
            <Container
              className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
            >
              <Form.Group className="text-center">
                <figure>
                  <Image
                    className={styles.ImageInput}
                    src={image}
                    alt="Your new uploaded image"
                    rounded
                  />
                </figure>
                <div>
                  <Form.Label
                    className={`${btnStyles.Button} btn`}
                    type="submit"
                    htmlFor="image-upload"
                  >
                    Edit Image
                  </Form.Label>
                </div>
                <Form.Control
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleChangeImage}
                  ref={imageInput}
                  className="d-none"
                />
              </Form.Group>
              {errors.image?.map((message, idx) => (
                <Alert
                  variant="warning"
                  className={styles.AlertStyles}
                  key={idx}
                >
                  {message}
                </Alert>
              ))}
              <div className="d-md-none">{textFields}</div>
            </Container>
          </Col>
        </Row>
      </Form>
    </CSSTransition>
  );
}

export default PostEditForm;
