import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import BookLoader from "./loader/BookLoader";
import axiosInstance from "../services/axiosInstance";

const ProtectedRoute = ({ Component, permittedRole }) => {
  const [auth, setAuth] = useState(null); // Use null to indicate loading state
  const [userrole, setUserrole] = useState()
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axiosInstance.get(`${process.env.REACT_APP_SERVER_URL}/api/check-auth`);
        //console.log(response.data.role)
        if (response.status === 200) {
          setAuth(true);
          setUserrole(response.data.role)
        } else {
          setAuth(false);
          localStorage.clear();
        }
      } catch (error) {
        //console.log("Error checking Session", error);
        setAuth(false);
      }
    };

    checkAuthentication();
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        checkAuthentication();
      }
    };

    const handleStorageChange = () => {
      checkAuthentication();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('storage', handleStorageChange);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('storage', handleStorageChange);
    };

    // eslint-disable-next-line
  }, []);

  // While authentication status is loading, you can choose to show a loading spinner or a message
  if (auth === null) {
    return <BookLoader />;
  }
  const hasRequiredRole = permittedRole ? userrole === permittedRole : true;

  return auth && hasRequiredRole ? Component : <Navigate to={"/login"} />;
};

export default ProtectedRoute;
