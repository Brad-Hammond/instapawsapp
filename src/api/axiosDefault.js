import axios from "axios";

// Base Axios configuration
axios.defaults.baseURL = 'https://instapaws-api-7ae61eec653f.herokuapp.com/';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.withCredentials = true;

// Create separate Axios instances
export const axiosReq = axios.create();
export const axiosRes = axios.create();

// Add Authorization header with token to requests
axiosReq.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor to refresh token if access token expires
axiosRes.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if error is due to expired token
    if (
      error.response?.status === 401 &&
      error.response?.data?.code === "token_not_valid" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true; // Prevent infinite loop

      try {
        const refreshToken = localStorage.getItem("refresh_token");

        if (refreshToken) {
          // Request a new access token using the refresh token
          const { data } = await axios.post("/dj-rest-auth/token/refresh/", {
            refresh: refreshToken,
          });

          // Save new tokens in localStorage
          localStorage.setItem("access_token", data.access);
          localStorage.setItem("refresh_token", data.refresh);

          // Update the original request with the new access token
          originalRequest.headers.Authorization = `Bearer ${data.access}`;
          return axiosReq(originalRequest);
        } else {
          console.error("No refresh token found.");
          return Promise.reject(error);
        }
      } catch (refreshError) {
        console.error("Failed to refresh token:", refreshError);
        // Optional: Redirect to login page
        window.location.href = "/login";
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);
