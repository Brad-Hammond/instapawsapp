import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";
import Avatar from "../../components/Avatar";

const Post = ({ id, title, image, content, owner, profile_id, profile_image }) => {
  return (
    <Card>
      <Card.Body>
        <Media>
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={55} />
            {owner}
          </Link>
        </Media>
      </Card.Body>
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
