import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefault";
import { useCurrentUser, useSetCurrentUser } from "../../contexts/CurrentUserContext";
import alertStyles from "../../styles/PostCreateEditForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import inputStyles from "../../styles/SignupLogIn.module.css";
import { CSSTransition } from "react-transition-group";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";

const ProfileEditForm = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const { id } = useParams();
  const navigate = useNavigate();
  const imageFile = useRef();
  const nodeRef = useRef(null);

  const [profileData, setProfileData] = useState({
    name: "",
    content: "",
    image: "",
  });
  const { name, content, image } = profileData;
  const [showProfileMsg, setProfileMsg] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (image && typeof image === "string" && image.startsWith("blob:")) {
      return () => URL.revokeObjectURL(image);
    }
  }, [image]);

  useEffect(() => {
    const handleMount = async () => {
      if (currentUser?.profile_id?.toString() === id) {
        try {
          const { data } = await axiosReq.get(`/profiles/${id}/`);
          const { name, content, image } = data;
          setProfileData({ name, content, image });
        } catch (err) {
          console.error(err.response?.data || "Failed to fetch profile data.");
          navigate("/");
        }
      } else {
        navigate("/");
      }
    };
    handleMount();
  }, [currentUser, navigate, id]);

  const handleChange = (event) => {
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form submitted!");
  
    const formData = new FormData();
    formData.append("name", name);
    formData.append("content", content);
  
    if (imageFile?.current?.files[0]) {
      formData.append("image", imageFile?.current?.files[0]);
    }
  
    console.log("FormData to send:", [...formData.entries()]);
  
    try {
      console.log("Sending API request...");
      const { data } = await axiosReq.put(`/profiles/${id}/`, formData);
      console.log("API Response:", data);
  
      setCurrentUser((prevUser) => ({
        ...prevUser,
        profile_image: data.image,
      }));
      setProfileMsg(true);
      setTimeout(() => navigate(-1), 2000);
    } catch (err) {
      console.error("Error during API call:", err.response?.data || err.message);
      setErrors(err.response?.data || {});
    }
  };
  

  const textFields = (
    <>
      <Form.Group>
        {showProfileMsg && <div className="alert alert-info">Profile updated!</div>}
        <Form.Label className="font-weight-bold">My Profile Bio:</Form.Label>
        <Form.Control
          as="textarea"
          value={content}
          onChange={handleChange}
          name="content"
          rows={7}
          className={inputStyles.Input}
        />
      </Form.Group>
      {errors?.content?.map((message, idx) => (
        <Alert variant="warning" className={alertStyles.AlertStyles} key={idx}>
          {message}
        </Alert>
      ))}
      <Button
        className={`my-3 ${btnStyles.Button}`}
        type="submit"
        disabled={!name.trim() || !content.trim()}
      >
        Save Changes
      </Button>
      <Button className={`mx-3 ${btnStyles.CancelButton}`} onClick={() => navigate(-1)}>
        Cancel Changes
      </Button>
    </>
  );

  return (
    <CSSTransition in={true} appear={true} timeout={{ enter: 300 }} classNames="fade" nodeRef={nodeRef}>
      <div ref={nodeRef}>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={8} className="d-none d-md-block p-0 p-md-2 text-center">
              <Container className={appStyles.Content}>{textFields}</Container>
            </Col>
            <Col md={4} className="py-2 p-0 p-md-2 text-center">
              <Container className={appStyles.Content}>
                <Form.Group>
                  {image && (
                    <figure>
                      <Image src={image} alt="Profile" fluid />
                    </figure>
                  )}
                  <div>
                    <Form.Label
                      className={`${btnStyles.Button} btn`}
                      htmlFor="image-upload"
                    >
                      Change Avatar
                    </Form.Label>
                  </div>
                  <input
                    type="file"
                    id="image-upload"
                    ref={imageFile}
                    accept="image/*"
                    className="d-none"
                    onChange={(e) => {
                      if (e.target.files.length) {
                        setProfileData({
                          ...profileData,
                          image: URL.createObjectURL(e.target.files[0]),
                        });
                      }
                    }}
                  />
                </Form.Group>
                {errors?.image?.map((message, idx) => (
                  <Alert variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}
                <div className="d-md-none">{textFields}</div>
              </Container>
            </Col>
          </Row>
        </Form>
      </div>
    </CSSTransition>
  );
};

export default ProfileEditForm;
