import React, { useRef, useState } from "react"; // Added useRef
import { useNavigate } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefault";
import { useRedirect } from "../../hooks/useRedirect";
import Asset from "../../components/Asset";
import Upload from "../../assets/noImageFound.avif";
import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import inputStyles from "../../styles/SignupLogIn.module.css";
import btnStyles from "../../styles/Button.module.css";
import formStyles from "../../styles/PostCreateEditForm.module.css";
import assetStyles from "../../styles/Asset.module.css";
import { CSSTransition } from "react-transition-group";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";
/*
  PostCreateForm Component
  -------------------------
  - Allows users to create a new post with a title, tag, content, and an optional image.

  Features:
  - Manages form state (`postData`) for title, tags, content, and image.
  - Handles image uploads and previews with a file input and `URL.createObjectURL`.
  - Submits the form data to the API using `FormData`, including image and text fields.
  - Displays error messages for invalid fields and validation failures from the API.
  - Implements smooth fade-in animation using `CSSTransition`.
  - Provides responsive layout:
    1. Text fields and image input are split into two columns for larger screens.
    2. A condensed single-column layout for smaller screens.
  - Includes buttons for form submission and cancelation, with navigation back on cancel.
  - Styled using custom classes (`styles`, `formStyles`, `btnStyles`, and `assetStyles`).
*/

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
  const navigate = useNavigate();

  const nodeRef = useRef(null);

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
      const { data } = await axiosReq.post("/posts/", formData);
      navigate(`/posts/${data.id}`);
    } catch (err) {
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const textFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label>Give your post a title!</Form.Label>
        <Form.Control
          type="text"
          name="title"
          className={`${formStyles.Form} ${inputStyles.Input}`}
          value={title}
          onChange={handleChange}
        />
      </Form.Group>
      {errors.title?.map((message, idx) => (
        <Alert variant="warning" className={styles.AlertStyles} key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Choose a Tag</Form.Label>
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
        <Form.Label>Describe your post!</Form.Label>
        <Form.Control
          as="textarea"
          rows={5}
          name="content"
          className={`${formStyles.Form} ${inputStyles.Input}`}
          value={content}
          onChange={handleChange}
        />
      </Form.Group>
      {errors.content?.map((message, idx) => (
        <Alert variant="warning" className={styles.AlertStyles} key={idx}>
          {message}
        </Alert>
      ))}

      <Button className={btnStyles.Button} type="submit">
        Create Post
      </Button>

      <Button
        className={`${btnStyles.CancelButton} mx-3`}
        onClick={() => navigate(-1)}
      >
        Cancel Post
      </Button>
    </div>
  );

  return (
    <CSSTransition
      in={true}
      appear={true}
      timeout={{ enter: 300 }}
      classNames="fade"
      nodeRef={nodeRef}
    >
      <Form onSubmit={handleSubmit} ref={nodeRef}>
        <Row>
          <Col md={7} lg={8} className="d-none d-md-block p-0 p-md-2">
            <Container className={appStyles.Content}>{textFields}</Container>
          </Col>
          <Col className="py-2 p-0 p-md-2" md={5} lg={4}>
            <Container
              className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
            >
              <Form.Group className="text-center">
                {image ? (
                  <>
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
                        Change Image
                      </Form.Label>
                    </div>
                  </>
                ) : (
                  <Form.Label
                    className="d-flex justify-content-center"
                    htmlFor="image-upload"
                  >
                    <Asset
                      src={Upload}
                      alt="Upload"
                      message="Upload your photo here!"
                      className={assetStyles.Asset}
                    />
                  </Form.Label>
                )}
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

export default PostCreateForm;
