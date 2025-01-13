import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
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
/*
  CurrentUserProvider Component
  ------------------------------
  - Provides context for managing the current user's authentication state across the application.

  Props:
  - children: React components that will consume the user context.

  Features:
  - Manages `currentUser` state and updates it upon mounting using the `handleMount` function.
  - Integrates Axios interceptors:
    1. Request Interceptor: Refreshes the token or reloads the page if needed.
    2. Response Interceptor: Handles 401 errors by attempting token refresh or redirecting to login.
  - Automatically logs out the user if token refresh fails, removing token timestamps and resetting state.
  - Uses React context (`CurrentUserContext` and `SetCurrentUserContext`) to provide `currentUser` and `setCurrentUser` globally.
  - Implements `useEffect` and `useMemo` hooks to manage lifecycle events and optimize performance.
*/

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const handleMount = async () => {
    try {
      if (getCookie("refreshTokenTimestamp") === "") {
        await axios.post("/dj-rest-auth/logout/");
      }
      const { data } = await axiosRes.get("/dj-rest-auth/user/");
      setCurrentUser(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    handleMount();
  }, []);

  useMemo(() => {
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
                  navigate("/login");
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
      (err) => Promise.reject(err)
    );

    axiosRes.interceptors.response.use(
      (response) => response,
      async (err) => {
        if (err.response?.status === 401) {
          try {
            await axios.post("/dj-rest-auth/token/refresh/");
          } catch (err) {
            setCurrentUser((prevCurrentUser) => {
              if (prevCurrentUser) {
                navigate("/login");
              }
              return null;
            });
            removeTokenTimestamp();
          }
          return axios(err.config);
        }
        return Promise.reject(err);
      }
    );
  }, [navigate]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};

// PropTypes validation
CurrentUserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
