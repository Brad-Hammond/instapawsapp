import React from "react";
import { Link, useHistory } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";
import Avatar from "../../components/Avatar";
import { DropdownMenu } from "../../components/DropdownMenu";
import { RiHeartsFill, RiHeartsLine } from "react-icons/ri";
import { axiosReq } from "../../api/axiosDefault";

const Post = ({
  id,
  title,
  image,
  content,
  owner,
  profile_id,
  profile_image,
  postPage,
  likes_total,
  like_id,
  setPosts,
}) => {
  const history = useHistory();

  const handleLike = async () => {
    try {
      const { data } = await axiosReq.post("/likes/", { post: id });
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) =>
          post.id === id
            ? { ...post, likes_total: post.likes_total + 1, like_id: data.id }
            : post
        ),
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleUnlike = async () => {
    try {
      await axios.delete(`/likes/${like_id}/`);
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) =>
          post.id === id
            ? { ...post, likes_total: post.likes_total - 1, like_id: null }
            : post
        ),
      }));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Card>
      <Card.Body>
        <Media>
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={55} />
            {owner}
          </Link>
          {postPage && (
            <DropdownMenu handleEdit={handleEdit} handleDelete={handleDelete} />
          )}
        </Media>
      </Card.Body>
      <Link to={`/posts/${id}/`}>
        <Card.Img src={image} alt={title} />
      </Link>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{content}</Card.Text>
        <div>
          {like_id ? (
            <span onClick={handleUnlike}>
              <RiHeartsFill />
            </span>
          ) : (
            <span onClick={handleLike}>
              <RiHeartsLine />
            </span>
          )}
          {likes_total}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Post;
