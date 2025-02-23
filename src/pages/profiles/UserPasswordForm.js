import React, { useEffect, useState, useRef } from "react"; // Added useRef
import { useNavigate, useParams } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosRes } from "../../api/axiosDefault";
import appStyles from "../../App.module.css";
import inputStyles from "../../styles/SignupLogIn.module.css";
import alertStyles from "../../styles/PostCreateEditForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import CSSTransition from "react-transition-group/CSSTransition";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import UserFeedbackCue from "../../components/UserFeedbackCue";
/*
  UserPasswordForm Component
  ---------------------------
  - Allows users to change their account password.

  Features:
  - Fetches the current user's profile ID and ensures the form is accessible only to the account owner.
  - Manages form state (`userData`) for new password fields (`new_password1`, `new_password2`).
  - Submits the updated password to the API and provides feedback on success or failure.
  - Displays error messages dynamically for invalid password inputs.
  - Shows a success message (`UserFeedbackCue`) upon successful password change, with a timed redirect back.
  - Includes responsive layout with form inputs and styled buttons for submitting or navigating back.
  - Prevents accidental form submissions or button clicks with `onMouseDown` handlers.
  - Implements smooth fade-in animation using `CSSTransition` and a `nodeRef`.
  - Styled using custom classes (`inputStyles`, `btnStyles`, and `alertStyles`) for consistent design.
*/

const UserPasswordForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const currentUser = useCurrentUser();

  const [userData, setUserData] = useState({
    new_password1: "",
    new_password2: "",
  });
  const { new_password1, new_password2 } = userData;
  const [showPasswordMsg, setPasswordMsg] = useState();
  const [errors, setErrors] = useState({});

  const nodeRef = useRef(null);

  const handleChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    if (currentUser?.profile_id?.toString() !== id) {
      navigate.push("/");
    }
  }, [currentUser, navigate, id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.post("/dj-rest-auth/password/change/", userData);
      setPasswordMsg(true);
      setTimeout(function () {
        navigate(-1);
      }, 2000);
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <CSSTransition
      in={true}
      appear={true}
      timeout={{ enter: 300 }}
      classNames="fade"
      nodeRef={nodeRef}
    >
      <Row ref={nodeRef}>
        <Col className="py-2 mx-auto text-center font-weight-bold" md={10}>
          {showPasswordMsg && (
            <UserFeedbackCue
              variant="Info"
              message="Password changed! Taking you back!"
            />
          )}
          <Container className={appStyles.Content}>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>New password</Form.Label>
                <Form.Control
                  placeholder="type your new password"
                  type="password"
                  value={new_password1}
                  onChange={handleChange}
                  name="new_password1"
                  className={`${inputStyles.Input} text-center`}
                />
              </Form.Group>
              {errors?.new_password1?.map((message, idx) => (
                <Alert
                  variant="warning"
                  className={alertStyles.AlertStyles}
                  key={idx}
                >
                  {message}
                </Alert>
              ))}
              <Form.Group>
                <Form.Label>Confirm new password</Form.Label>
                <Form.Control
                  placeholder="confirm new password"
                  type="password"
                  value={new_password2}
                  onChange={handleChange}
                  name="new_password2"
                  className={`${inputStyles.Input} text-center`}
                />
              </Form.Group>
              {errors?.new_password2?.map((message, idx) => (
                <Alert
                  variant="warning"
                  className={alertStyles.AlertStyles}
                  key={idx}
                >
                  {message}
                </Alert>
              ))}
              <Button
                type="submit"
                className={`mx-2 my-2 ${btnStyles.Button}`}
                onMouseDown={(event) => event.preventDefault()}
              >
                Save new password
              </Button>
              <Button
                onMouseDown={(event) => event.preventDefault()}
                className={`mx-2 ${btnStyles.CancelButton}`}
                onClick={() => navigate.goBack()}
              >
                Go back
              </Button>
            </Form>
          </Container>
        </Col>
      </Row>
    </CSSTransition>
  );
};

export default UserPasswordForm;
