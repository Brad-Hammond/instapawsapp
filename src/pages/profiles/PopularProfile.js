import React from "react";
import { useProfileData } from "../../contexts/ProfileDataContext";
import styles from "../../styles/PopularProfiles.module.css";
import scrollStyles from "../../styles/ScrollBar.module.css";
import { BiCrown } from "react-icons/bi";
import Container from "react-bootstrap/Container";
import Asset from "../../components/Asset";
import Profile from "./Profile";

/*
  Shows 5 of the most followed profiles
*/
const PopularProfiles = () => {
  const { popularProfiles } = useProfileData();

  return (
    <Container className={`${styles.Content} ${scrollStyles.ScrollBar}`}>
      {popularProfiles.results.length ? (
        <>
          <p className={`${styles.MostFollowedBloggers} text-center`}>
            <BiCrown size={25} className={styles.CrownIcon} /> Most Followed
          </p>
          {popularProfiles.results.slice(0, 5).map((profile) => (
            <Profile key={profile.id} profile={profile} />
          ))}
        </>
      ) : (
        <Asset spinner />
      )}
    </Container>
  );
};

export default PopularProfiles;
