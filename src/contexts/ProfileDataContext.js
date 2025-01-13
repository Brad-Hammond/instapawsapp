import React, { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { axiosReq, axiosRes } from "../api/axiosDefault";
import { useCurrentUser } from "./CurrentUserContext";
import { followHelper, unfollowHelper } from "../utils/utils";

export const ProfileDataContext = createContext();
export const SetProfileDataContext = createContext();

export const useProfileData = () => useContext(ProfileDataContext);
export const useSetProfileData = () => useContext(SetProfileDataContext);
/*
  ProfileDataProvider Component
  ------------------------------
  - Provides context for managing profile-related data, such as profile pages and popular profiles.

  Props:
  - children: React components that consume the profile context.

  Features:
  - Manages `profileData` state, including `profilePage` and `popularProfiles` data.
  - Implements `handleFollow` and `handleUnfollow` functions to update follow relationships dynamically:
    1. `handleFollow`: Adds a follow relationship and updates the relevant profile lists.
    2. `handleUnfollow`: Removes a follow relationship and updates the relevant profile lists.
  - Fetches popular profiles on mount when a user is logged in using the `useEffect` hook.
  - Uses React context (`ProfileDataContext` and `SetProfileDataContext`) to provide `profileData`, `setProfileData`, and follow/unfollow handlers globally.
*/

export const ProfileDataProvider = ({ children }) => {
  const [profileData, setProfileData] = useState({
    profilePage: { results: [] },
    popularProfiles: { results: [] },
  });

  const currentUser = useCurrentUser();

  const handleFollow = async (clickedProfile) => {
    try {
      const { data } = await axiosRes.post("/followers/", {
        followed: clickedProfile.id,
      });

      setProfileData((prevState) => ({
        ...prevState,
        profilePage: {
          results: prevState.profilePage.results.map((profile) =>
            followHelper(profile, clickedProfile, data.id)
          ),
        },
        popularProfiles: {
          ...prevState.popularProfiles,
          results: prevState.popularProfiles.results.map((profile) =>
            followHelper(profile, clickedProfile, data.id)
          ),
        },
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleUnfollow = async (clickedProfile) => {
    try {
      await axiosRes.delete(`/followers/${clickedProfile.following_id}/`);
      setProfileData((prevState) => ({
        ...prevState,
        profilePage: {
          results: prevState.profilePage.results.map((profile) =>
            unfollowHelper(profile, clickedProfile)
          ),
        },
        popularProfiles: {
          ...prevState.popularProfiles,
          results: prevState.popularProfiles.results.map((profile) =>
            unfollowHelper(profile, clickedProfile)
          ),
        },
      }));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(
          "/profiles/?ordering=-followers_total"
        );
        setProfileData((prevState) => ({
          ...prevState,
          popularProfiles: data,
        }));
      } catch (err) {
        console.error(err);
      }
    };

    if (currentUser) {
      handleMount();
    }
  }, [currentUser]);

  return (
    <ProfileDataContext.Provider value={profileData}>
      <SetProfileDataContext.Provider
        value={{ setProfileData, handleFollow, handleUnfollow }}
      >
        {children}
      </SetProfileDataContext.Provider>
    </ProfileDataContext.Provider>
  );
};

// PropTypes validation
ProfileDataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
