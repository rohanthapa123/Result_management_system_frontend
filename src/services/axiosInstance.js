import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  timeout: 10000, // Adjust timeout as needed
  withCredentials: true, // Ensure cookies are sent with requests
});

// Request interceptor for adding Authorization header
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling token refresh and global error handling
axiosInstance.interceptors.response.use(
  (response) => {
    // Handle responses globally
    // console.log(response)
    return response;
  },
  async (error) => {
    // Handle errors globally
    const originalRequest = error.config;
    // console.log("original request" , originalRequest)
    if (error.response && error.response.status === 403 && !originalRequest._retry) {
      // Unauthorized: token expired or invalid
      originalRequest._retry = true;

      try {
        // Attempt to refresh the access token using the refresh token from HttpOnly cookie
        const response = await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/api/refresh-token`,
          null,
          { withCredentials: true } // Ensure cookies are sent with this request
        );
        // console.log(response)
        if (response.status === 200) {
          const { accessToken } = response.data;

          // Update the access token in localStorage
          localStorage.setItem("accessToken", accessToken);

          // Retry the original request with the new access token
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        console.error("Error refreshing token:", refreshError);
      }
      console.log("god")
      // If refresh token fails or there's no refresh token, clear tokens and redirect to login
      localStorage.clear(); // Clear all tokens
      window.location.href = "/login"; // Redirect to login page
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
