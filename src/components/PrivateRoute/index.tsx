import React, { useEffect, useRef, useState } from "react";
import { Navigate, RouteProps } from "react-router-dom";

import { useAuth } from "contexts/AuthContext";

type PrivateRouteProps = RouteProps & {
  element: React.ReactNode;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const { isAuthenticated } = useAuth();
  const hasAlreadyLogout = useRef<boolean>(false);
  const [notAuth, setNotAuth] = useState(false);

  useEffect(() => {
    if (hasAlreadyLogout.current) {
      return;
    }
    if (!isAuthenticated) {
      hasAlreadyLogout.current = true;
      setNotAuth(true);
    }
  }, [isAuthenticated]);

  if(isAuthenticated){
    return element;
  }
  if(notAuth) {
    return <Navigate to="/" />;
  }
};

export default PrivateRoute;
