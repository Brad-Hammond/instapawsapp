import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
  } from "react";
  import { useHistory } from "react-router-dom";
  import { axiosReq, axiosRes } from "../api/axiosDefault";
  import axios from "axios";
  import {
    getCookie,
    removeTokenTimestamp,
    shouldRefreshPage,
    shouldRefreshToken,
  } from "../utils/utils";

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();
  
export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);
  
export const CurrentUserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
  
    return (
      <CurrentUserContext.Provider value={currentUser}>
        <SetCurrentUserContext.Provider value={setCurrentUser}>
          {children}
        </SetCurrentUserContext.Provider>
      </CurrentUserContext.Provider>
    );
  };

  const handleMount = async () => {
    try {
      if (getCookie("refreshTokenTimestamp") === "") {
        await axios.post("/dj-rest-auth/logout/");
      }
      const { data } = await axiosRes.get("/dj-rest-auth/user/");
      setCurrentUser(data);
    } catch (err) {
      return err;
    }
  };