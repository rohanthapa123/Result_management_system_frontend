import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ Component, permittedRole }) => {
  const [auth, setAuth] = useState(null); // Use null to indicate loading state
  const [userrole, setUserrole] = useState()
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/api/check-auth`,
          { withCredentials: true }
        );
        // console.log(response.data.role)
        if (response.status === 200) {
          setAuth(true);
          setUserrole(response.data.role)
        } else {
          setAuth(false);
        }
      } catch (error) {
        console.log("Error checking Session", error);
        setAuth(false);
      }
    };

    checkAuthentication();
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        checkAuthentication();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };

    // eslint-disable-next-line
  }, []);

  // While authentication status is loading, you can choose to show a loading spinner or a message
  if (auth === null) {
    return <div>Loading...</div>;
  }
  const hasRequiredRole = permittedRole ? userrole === permittedRole : true;

  return auth && hasRequiredRole ? Component : <Navigate to={"/login"} />;
};

export default ProtectedRoute;
