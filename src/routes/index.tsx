import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

const Login = lazy(() => import("pages/Login"));
const Create = lazy(() => import("pages/Create"));
const Home = lazy(() => import("pages/Home"));
const Dashboard = lazy(() => import("pages/Dashboard"));

import PrivateRoute from "components/PrivateRoute";
import Spinner from "components/Spinner";

function ReactRoute() {
  return (
    <BrowserRouter>
      <Helmet defaultTitle="Data Genie UI">
        <meta name="description" content="Data Genie UI" />
      </Helmet>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<PrivateRoute element={<Home />} />} />
          <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
          <Route path="/create" element={<PrivateRoute element={<Create />} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default ReactRoute;
