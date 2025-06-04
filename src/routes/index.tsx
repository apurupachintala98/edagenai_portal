import { lazy, Suspense, useState } from "react";
import { Helmet } from "react-helmet-async";
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from "react-router-dom";

import PrivateRoute from "components/PrivateRoute";
import Spinner from "components/Spinner";

import LlmGateway from "../pages/LlmGateway";
import useIdleTimer from "../hooks/useIdleTimer";
import { useAuth } from "../contexts/AuthContext";

const Login = lazy(() => import("pages/Login"));
const Dashboard = lazy(() => import("pages/Dashboard"));
const Home = lazy(() => import("pages/Home"));
const Admin = lazy(() => import("pages/Admin"));
const ProjectDetails = lazy(() => import("pages/ProjectDetails"));


function ReactRoute() {
    const { logout } = useAuth();
  const [sidebarType, setSidebarType] = useState<string>("default");
  const theme = {};

   useIdleTimer(() => {
    //If user screen is ideal for 5 min then it will be auto logout
    logout();
  });

  return (
    <BrowserRouter>
      <Helmet defaultTitle="Elevance Data Intelligence Platform">
        <meta name="description" content="Elevance Data Intelligence Platform" />
      </Helmet>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<PrivateRoute element={<Home />} />} />
          <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
          <Route path="/admin" element={<PrivateRoute element={<Admin />} />} />
          <Route
            path="/llm-gateway"
            element={
              <PrivateRoute
                element={
                  <LlmGateway
                    sidebarType={sidebarType}
                    setSidebarType={setSidebarType}
                    theme={theme}
                  />
                }
              />
            }
          />
          {/* <Route path="/dashboard/project/:projectID" element={<PrivateRoute element={<ProjectDetails />} />} /> */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default ReactRoute;
