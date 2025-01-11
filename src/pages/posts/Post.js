import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";

const Post = ({ id, title, image, content }) => {
  return (
    <Card>
      <Link to={`/posts/${id}/`}>
        <Card.Img src={image} alt={title} />
      </Link>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{content}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Post;
