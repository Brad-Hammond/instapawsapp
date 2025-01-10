import React from "react";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { NavLink } from "react-router-dom";
import styles from "../styles/HomePage.module.css";
import appStyles from "../App.module.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import CSSTransition from "react-transition-group/CSSTransition";


const HomePage = () => {
  const currentUser = useCurrentUser();

  return (
    <CSSTransition
      in={true}
      appear={true}
      timeout={{ enter: 300 }}
      classNames="fade"
    >
      <Container fluid>
        <Jumbotron className={`${appStyles.Content} p-5`} fluid>
          <Container>
            <h1 className={styles.HomeTitle}>Welcome to InstaPaws</h1>
            <p className={`${styles.HomeDescription} lead`}>
              Join our community and share your dog's journey.
            </p>
            {!currentUser && (
              <p>
                <NavLink to="/signup">
                  <Button className={`${styles.HomeButton} text-center`}>
                    Sign Up
                  </Button>
                </NavLink>
                <NavLink to="/login">
                  <Button className={`${styles.HomeButton} text-center`}>
                    Log In
                  </Button>
                </NavLink>
              </p>
            )}
          </Container>
        </Jumbotron>
        <Container className="my-5">
          <Row className="g-4">
            <Col md={6} lg={4} className={`${appStyles.Content} ${styles.HomePromptOne} ${styles.HomePrompt}`}>
              <div className="p-4">
                <h2 className="text-center">Lorem ispum</h2>
                <p className="mt-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
            </Col>
            <Col md={6} lg={4}>
              <div className={`${appStyles.Content} ${styles.HomePrompt}`}>
                <h2 className="text-center">Lorem ispum</h2>
                <p className="m-3 mt-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
            </Col>
            <Col md={6} lg={4} className={`${appStyles.Content} ${styles.HomePromptThree} ${styles.HomePrompt}`}>
              <div className="p-4">
                <h2 className="text-center">Lorem ispum</h2>
                <p className="mt-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
    </CSSTransition>
  );
};

export default HomePage;
