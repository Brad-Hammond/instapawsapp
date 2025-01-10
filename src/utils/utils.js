import jwtDecode from "jwt-decode";
import { axiosReq } from "../api/axiosDefault";

export const getCookie = (cname) => {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  };
  
  export const removeTokenTimestamp = () => {
    localStorage.removeItem("refreshTokenTimestamp");
  };
  
  export const setTokenTimestamp = (data) => {
    const refreshTokenTimestamp = jwtDecode(data?.refresh_token).exp;
    localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp);
  };
  
  export const shouldRefreshToken = () => {
    const token = getCookie("refreshTokenTimestamp");
    return !token;
  };
  
  export const shouldRefreshPage = (data) => {
    if (data) {
      const profileIdOfPost = data.profile_id;
      const profileIdSignedIn = parseInt(getCookie("profile_id"));
      return profileIdOfPost === profileIdSignedIn;
    }
    return false;
  };
  
  export const fetchMoreData = async (resource, setResource) => {
    try {
      const { data } = await axiosReq.get(resource.next);
      setResource((prevResource) => ({
        ...prevResource,
        next: data.next,
        results: data.results.reduce((acc, cur) => {
          return acc.some((accResult) => accResult.id === cur.id)
            ? acc
            : [...acc, cur];
        }, prevResource.results),
      }));
    } catch (err) {
      console.error(err);
    }
  };
  
  export const unfollowHelper = (profile, clickedProfile) => {
    return profile.id === clickedProfile.id
      ? {
          ...profile,
          followers_total: profile.followers_total - 1,
          following_id: null,
        }
      : profile.is_owner
      ? { ...profile, following_total: profile.following_total - 1 }
      : profile;
  };
  
  export const followHelper = (profile, clickedProfile, following_id) => {
    return profile.id === clickedProfile.id
      ? {
          ...profile,
          followers_total: profile.followers_total + 1,
          following_id,
        }
      : profile.is_owner
      ? { ...profile, following_total: profile.following_total + 1 }
      : profile;
  };