import React, { useRef } from "react";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { NavLink } from "react-router-dom";
import styles from "../styles/HomePage.module.css";
import appStyles from "../App.module.css";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { CSSTransition } from "react-transition-group";
import '@fortawesome/fontawesome-free/css/all.min.css';


const HomePage = () => {
  const currentUser = useCurrentUser();
  const nodeRef = useRef(null); // Create a ref for the CSSTransition node

  return (
    <CSSTransition
      in={true}
      appear={true}
      timeout={{ enter: 300 }}
      classNames="fade"
      nodeRef={nodeRef} // Attach the ref to CSSTransition
    >
      <Container fluid ref={nodeRef}>
        <Row
          className={`${appStyles.Content} p-5`}
          style={{ backgroundColor: "#A3B18A", color: "white" }}
        >
          <Col>
            <h1 className={styles.HomeTitle}>Welcome to InstaPaws</h1>
            <p className={`${styles.HomeDescription} lead`}>
              Join our community and share your dog's journey.
            </p>
            {!currentUser && (
              <p>
                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    isActive ? styles.ActiveLink : ""
                  }
                >
                  <Button className={`${styles.HomeButton} text-center`}>
                    Sign Up
                  </Button>
                </NavLink>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? styles.ActiveLink : ""
                  }
                >
                  <Button className={`${styles.HomeButton} text-center`}>
                    Log In
                  </Button>
                </NavLink>
              </p>
            )}
          </Col>
        </Row>

        <Container className="my-5">
          <Row className="g-4">
            <Col
              md={6}
              lg={4}
              className={`${appStyles.Content} ${styles.HomePromptOne} ${styles.HomePrompt}`}
            >
              <div className="p-4">
                <h2 className="text-center">Share Photos!</h2>
                <p className="mt-4">
                Share photos of your 4-legged friends with the community!
                </p>
              </div>
            </Col>
            <Col md={6} lg={4}>
              <div
                className={`${appStyles.Content} ${styles.HomePrompt}`}
              >
                <h2 className="text-center">Like and Comment!</h2>
                <p className="m-3 mt-4">
                  Like and comment on photos of other fury friends!
                </p>
              </div>
            </Col>
            <Col
              md={6}
              lg={4}
              className={`${appStyles.Content} ${styles.HomePromptThree} ${styles.HomePrompt}`}
            >
              <div className="p-4">
                <h2 className="text-center">Join the Community</h2>
                <p className="mt-4">
                  Sign up now and join our amazing community of dog lovers!
                </p>
              </div>
            </Col>
          </Row>
        </Container>

        <footer>
          <div className="text-center">
            <p className={`${styles.ContactIcons} text-white`}>
              Created by Bradley Hammond
            </p>
          </div>
          <div className="text-center pb-3">
            <p className={`${styles.ContactIcons} text-white`}>
              Connect with me:
            </p>
            <a
              href="https://github.com/Brad-Hammond?tab=repositories"
              aria-label="Check out my Github!"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i
                className={`${styles.ContactIcons} ${styles.GithubIcon} fab fa-github`}
              />
            </a>
            <a
              href="https://www.linkedin.com/in/bradley-hammond-0ba801195/"
              aria-label="Check out my LinkedIn!"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i
                className={`${styles.ContactIcons} ${styles.LinkedinIcon} fab fa-linkedin`}
              />
            </a>
          </div>
        </footer>
      </Container>
    </CSSTransition>
  );
};

export default HomePage;
