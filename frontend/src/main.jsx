  import React from "react";
  import ReactDOM from "react-dom/client";
  import axios from "axios";

  import "./assets/style.css";
  import "./assets/bootstrap.min.css";
  import { createBrowserRouter, RouterProvider } from "react-router-dom";
  import Home from "./pages/Home";
  import Error from "./pages/Error";
  import Login from "./pages/Login";
  import Register from "./pages/Register";

  export const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/api/",
    timeout: 10000,
  });
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
      errorElement: <Error />,
    },
    {
      path: "/register",
      element: <Register />,
      errorElement: <Error />,
    },
    {
      path: "/",
      element: <Home />,
      errorElement: <Error />,
    },
  ]);
  ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
  );
