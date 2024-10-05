import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/public/Home";
import Login from "./pages/public/Login";
import Signup from "./pages/public/Signup";
import About from "./pages/public/About";
import Navbar from "./components/public/Navbar";
import PrivateRoutes from "./utils/PrivateRoutes";
import PublicRoutes from "./utils/PublicRoutes";
import LoggedNavbar from "./components/private/LoggedNavbar";
import Profile from "./pages/private/Profile";
import Map from "./pages/private/Map";
import { ToastContainer } from "react-toastify";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <PublicRoutes>
          <Navbar />
          <Home />
        </PublicRoutes>
      ),
    },
    {
      path: "/signup",
      element: (
        <PublicRoutes>
          <Navbar />
          <Signup />
        </PublicRoutes>
      ),
    },
    {
      path: "/login",
      element: (
        <PublicRoutes>
          <Navbar />
          <Login />
        </PublicRoutes>
      ),
    },
    {
      path: "/about",
      element: (
        <PublicRoutes>
          <Navbar />
          <About />
        </PublicRoutes>
      ),
    },
    {
      path: "/profile",
      element: (
        <PrivateRoutes>
          <LoggedNavbar />
          <Profile />
          <ToastContainer />
        </PrivateRoutes>
      ),
    },
    {
      path: "/map",
      element: (
        <PrivateRoutes>
          <LoggedNavbar />
          <Map />
          <ToastContainer />
        </PrivateRoutes>
      ),
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
