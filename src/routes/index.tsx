import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

const Login = lazy(() => import("pages/Login"));
const Dashboard = lazy(() => import("pages/Dashboard"));
const Home = lazy(() => import("pages/Home"));
const Admin = lazy(() => import("pages/Admin"));

import PrivateRoute from "components/PrivateRoute";
import Spinner from "components/Spinner";

function ReactRoute() {
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
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default ReactRoute;
