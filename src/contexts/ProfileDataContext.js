import React, { createContext, useContext, useState } from "react";

export const ProfileDataContext = createContext();
export const SetProfileDataContext = createContext();

export const useProfileData = () => useContext(ProfileDataContext);
export const useSetProfileData = () => useContext(SetProfileDataContext);

export const ProfileDataProvider = ({ children }) => {
    const [profileData, setProfileData] = useState({
      profilePage: { results: [] },
      popularProfiles: { results: [] },
    });
  
    return (
      <ProfileDataContext.Provider value={profileData}>
        <SetProfileDataContext.Provider value={{ setProfileData }}>
          {children}
        </SetProfileDataContext.Provider>
      </ProfileDataContext.Provider>
    );
  };