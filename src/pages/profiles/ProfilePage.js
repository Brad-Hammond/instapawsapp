import React, { useEffect, useState, useRef } from "react"; // Added useRef
import { useParams } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { fetchMoreData } from "../../utils/utils";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  useProfileData,
  useSetProfileData,
} from "../../contexts/ProfileDataContext";
import { axiosReq } from "../../api/axiosDefault";
import appStyles from "../../App.module.css";
import styles from "../../styles/ProfilePage.module.css";
import { CSSTransition } from "react-transition-group"; // Ensure CSSTransition is imported
import NoResultsFoundImage from "../../assets/noImageFound.avif";
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
/*
  ProfilePage Component
  ----------------------
  - Displays detailed information about a user's profile, including their bio, social stats, and posts.

  Features:
  - Fetches profile and post data using `axiosReq` and updates context/state on mount.
  - Displays:
    1. Profile avatar, owner name, bio, and social stats (posts, followers, following).
    2. User's posts with infinite scroll for seamless loading of additional content.
  - Allows the current user to:
    1. Edit their profile using `ProfileEditDropdownMenu`.
    2. Follow or unfollow other profiles.
  - Includes responsive layout:
    1. Left column: Navigation (`Toolbar`) and popular profiles.
    2. Right column: Profile details and posts.
  - Shows a spinner (`Asset`) while data is being loaded and fallback messages when no posts are available.
  - Styled using custom classes (`styles`, `appStyles`) for layout and design.
  - Implements smooth fade-in animation with `CSSTransition` and a `nodeRef`.
*/

function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const currentUser = useCurrentUser();
  const { id } = useParams();
  const { setProfileData, handleFollow, handleUnfollow } = useSetProfileData();
  const { profilePage } = useProfileData();
  const [profile] = profilePage.results;
  const is_owner = currentUser?.username === profile?.owner;
  const [profilePosts, setProfilePosts] = useState({ results: [] });

  const nodeRef = useRef(null);

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
        console.error("Error fetching profile data:", err);
      }
    };
    fetchData();
  }, [id, setProfileData]);

  const profileDetail = (
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
          Posts
          <span>{profile?.posts_total}</span>
        </p>
        <p className={styles.UserSocialNumbers}>
          Followers
          <span>{profile?.followers_total}</span>
        </p>
        <p className={styles.UserSocialNumbers}>
          Following
          <span>{profile?.following_total}</span>
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
  );

  const profileDetailPosts = (
    <>
      <hr />
      <p className={`${styles.UserPostsTitle} text-center`}>
        Posts by <strong>{profile?.owner}</strong>
      </p>
      {profilePosts.results.length ? (
        <InfiniteScroll
          dataLength={profilePosts.results.length}
          loader={<Asset spinner />}
          hasMore={!!profilePosts.next}
          next={() => fetchMoreData(profilePosts, setProfilePosts)}
        >
          {profilePosts.results.map((post) => (
            <Post key={post.id} {...post} setPosts={setProfilePosts} />
          ))}
        </InfiniteScroll>
      ) : (
        <Asset
          src={NoResultsFoundImage}
          message={`It looks like ${profile?.owner} hasn't posted yet... :(`}
        />
      )}
      <hr />
    </>
  );

  return (
    <CSSTransition
      in={true}
      appear={true}
      timeout={{ enter: 300 }}
      classNames="fade"
      nodeRef={nodeRef}
    >
      <Container ref={nodeRef}>
        <Row>
          <Col className="pt-2 p-0 g-0" lg={3}>
            <Toolbar />
            <Container className={`${appStyles.Content} mb-2`}>
              <PopularProfiles />
            </Container>
          </Col>
          <Col className="py-2 p-0 p-lg-2" lg={9}>
            <Container className={appStyles.Content}>
              {hasLoaded ? (
                <>
                  {profileDetail}
                  {profileDetailPosts}
                </>
              ) : (
                <Asset spinner />
              )}
            </Container>
          </Col>
        </Row>
      </Container>
    </CSSTransition>
  );
}

export default ProfilePage;
