import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { fetchMoreData } from "../../utils/utils";
import InfiniteScroll from "react-infinite-scroll-component";
import { useProfileData, useSetProfileData } from "../../contexts/ProfileDataContext";
import { axiosReq } from "../../api/axiosDefaults";
import appStyles from "../../App.module.css";
import styles from "../../styles/ProfilePage.module.css";
import CSSTransition from "react-transition-group/CSSTransition";
import NoResultsFoundImage from "../../assets/no-result-found.jpg";
import { ProfileEditDropdownMenu } from "../../components/DropdownMenu";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Asset from "../../components/Asset";
import PopularProfiles from "./PopularProfiles";
import Toolbar from "../../components/Toolbar";
import Post from "../posts/Post";

function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const currentUser = useCurrentUser();
  const { id } = useParams();
  const { setProfileData, handleFollow, handleUnfollow } = useSetProfileData();
  const { profilePage } = useProfileData();
  const [profilePosts, setProfilePosts] = useState({ results: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: profilePage }, { data: profilePosts }] =
          await Promise.all([
            axiosReq.get(`/profiles/${id}/`),
            axiosReq.get(`/posts/?owner__profile=${id}`),
          ]);
        setProfileData((prevState) => ({
          ...prevState,
          profilePage: { results: [profilePage] },
        }));
        setProfilePosts(profilePosts);
        setHasLoaded(true);
      } catch (err) {
        return err;
      }
    };
    fetchData();
  }, [id, setProfileData]);
}

const profile = profilePage.results[0];
const is_owner = currentUser?.username === profile?.owner;

const profileDetail = (
  <>
    <Row noGutters className="p-3 text-center">
      <Col lg={4} className="text-lg-left">
        <Image
          roundedCircle
          className={styles.UserAvatar}
          src={profile?.image}
          alt="Profile avatar"
        />
      </Col>
      <Col lg={4}>
        <h3 className="mt-2 mb-4">{profile?.owner}&apos;s profile</h3>
        <p className={styles.UserSocialNumbers}>
          Posts <span>{profile?.posts_total}</span>
        </p>
        <p className={styles.UserSocialNumbers}>
          Followers <span>{profile?.followers_total}</span>
        </p>
        <p className={styles.UserSocialNumbers}>
          Following <span>{profile?.following_total}</span>
        </p>
      </Col>
      <Col lg={4} className="text-lg-right">
        {profile?.is_owner && <ProfileEditDropdownMenu id={profile?.id} />}
        {currentUser &&
          !is_owner &&
          (profile?.following_id ? (
            <Button
              className={`${styles.UnfollowButton}`}
              onClick={() => handleUnfollow(profile)}
            >
              unfollow
            </Button>
          ) : (
            <Button
              className={`${styles.FollowButton}`}
              onClick={() => handleFollow(profile)}
            >
              follow
            </Button>
          ))}
      </Col>
      {profile?.content && <Col className="p-2">{profile.content}</Col>}
    </Row>
  </>
);

