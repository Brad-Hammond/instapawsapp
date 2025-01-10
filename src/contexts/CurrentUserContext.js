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
  
    useEffect(() => {
      handleMount();
    }, []);
  
    return (
      <CurrentUserContext.Provider value={currentUser}>
        <SetCurrentUserContext.Provider value={setCurrentUser}>
          {children}
        </SetCurrentUserContext.Provider>
      </CurrentUserContext.Provider>
    );
  };

  axiosReq.interceptors.request.use(
    async (config) => {
      if (shouldRefreshPage(config.data)) {
        window.location.reload();
      } else {
        if (shouldRefreshToken()) {
          try {
            await axios.post("/dj-rest-auth/token/refresh/");
          } catch (err) {
            setCurrentUser((prevCurrentUser) => {
              if (prevCurrentUser) {
                history.push("/login");
              }
              return null;
            });
            removeTokenTimestamp();
            return config;
          }
        }
        return config;
      }
    },
    (err) => {
      return Promise.reject(err);
    }
  );