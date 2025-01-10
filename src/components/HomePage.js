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
      </Container>
    </CSSTransition>
  );
};

export default HomePage;
