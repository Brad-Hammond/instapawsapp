import React from "react";
import { Link } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useSetProfileData } from "../../contexts/ProfileDataContext";
import Avatar from "../../components/Avatar";
import btnStyles from "../../styles/CommentCreateEditForm.module.css";
import styles from "../../styles/Profile.module.css";
import { AiOutlineUserAdd, AiOutlineUserDelete } from "react-icons/ai";
import Button from "react-bootstrap/Button";

const Profile = (props) => {
  const { profile, imageSize = 40 } = props;
  const { id, following_id, image, owner } = profile;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const { handleFollow, handleUnfollow } = useSetProfileData();

  return (
    <div className={`my-3 d-flex align-items-center flex-column`}>
      <div>
        <Link className="align-self-center" to={`/profiles/${id}`}>
          <Avatar src={image} height={imageSize} />
        </Link>
      </div>
      <div className={`mx-2 ${styles.ContentSplit}`}>
        <strong>{owner}</strong>
      </div>
      <div className={`text-center`}>
        {currentUser &&
          !is_owner &&
          (following_id ? (
            <Button
              className={`${btnStyles.CommentButton} ${styles.UnfollowButton}`}
              onClick={() => handleUnfollow(profile)}
            >
              unfollow <AiOutlineUserDelete size={20} />
            </Button>
          ) : (
            <Button
              className={`${btnStyles.CommentButton} ${styles.FollowButton}`}
              onClick={() => handleFollow(profile)}
            >
              follow <AiOutlineUserAdd size={20} />
            </Button>
          ))}
      </div>
    </div>
  );
};

export default Profile;
