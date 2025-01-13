import React from "react";
import styles from "../styles/PageNotFound.module.css";
import appStyles from "../App.module.css";
import btnStyles from "../styles/HomePage.module.css";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
/*
  PageNotFound Component
  -----------------------
  - Displays a custom 404 error page when a user navigates to a non-existent route.

  Features:
  - Shows an image and a message indicating the user is lost.
  - Includes a button to navigate back to the homepage using a `Link` component.
  - Utilizes Bootstrap's `Row`, `Col`, and `Container` for layout and styling.
  - Custom styles applied via `appStyles.Content` and `styles.PageNotFoundImage`.
  - Uses a placeholder image hosted on Cloudinary for the 404 page visual.
*/

const PageNotFound = () => {
  return (
    <Row>
      <Col className="py-2 mx-auto text-center" md={12}>
        <Container className={appStyles.Content}>
          <Image rounded />
          <Image
            className={styles.PageNotFoundImage}
            src="https://res.cloudinary.com/dpdhjt0cf/image/upload/v1736612547/NoImageFounf404_rrzz4d.jpg"
            alt="404 page not found image"
            rounded
          />
          <h3 className="my-3">It seems you got lost.</h3>

          <Link to="/">
            <Button className={`${btnStyles.HomeButton} my-3`}>
              Head back?
            </Button>
          </Link>
        </Container>
      </Col>
    </Row>
  );
};
export default PageNotFound;