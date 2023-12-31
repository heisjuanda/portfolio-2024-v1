import { lazy, Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Menu from "../components/Menu/Index";
import Footer from "../components/Footer/Index";
import Loader from "../components/Loader/Index";
import Home from "../pages/Home/Index";
import Work from "../pages/Work/Index";

const ErrorPage = lazy(() => import("../pages/ErrorPage/Index"));
const Project = lazy(() => import("../pages/Project/Index"));

export const RoutesConfiguration = () => {
  return (
    <Router>
      <Menu />
      <Routes>
        <Route
          path="*"
          element={
            <Suspense fallback={<Loader fullScreen />}>
              <ErrorPage />
            </Suspense>
          }
        />
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route
          path="/work/:handle"
          element={
            <Suspense fallback={<Loader fullScreen />}>
              <Project />
            </Suspense>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
};
