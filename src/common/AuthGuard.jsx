import React, { Fragment, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom"; // component props interface
import Login from "../pages/auth/Login";
import HomeLayout from "../layout/HomeLayout";
import Cookies from "js-cookie";
import { PREFIX } from "../constants";

const AuthGuard = ({ children }) => {
  function useAuth() {
    return Cookies.get(`${PREFIX}Token`) !== undefined;
  }

  const navigate = useNavigate();

  const isAuthenticated = useAuth();
  const { pathname } = useLocation();
  const [requestedLocation, setRequestedLocation] = useState(null);

  // console.log({ isAuthenticated, requestedLocation, pathname });

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }

    navigate("/login");
    return (
      <HomeLayout>
        <Login />
      </HomeLayout>
    );
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <Fragment>{children}</Fragment>;
};

export default AuthGuard;
