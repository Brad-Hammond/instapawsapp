import React from "react";
import { Link } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Avatar from "../../components/Avatar";
import styles from "../../styles/Profile.module.css";

const Profile = (props) => {
  const { profile, imageSize = 40 } = props;
  const { id, image, owner } = profile;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

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
    </div>
  );
};

export default Profile;
