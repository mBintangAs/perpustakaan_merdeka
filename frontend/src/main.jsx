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
import { Navigate } from "react-router-dom";
import Book from "./pages/Book";
import AddBook from "./pages/AddBook";

// axios.defaults.headers.common['Authorization'] ='Bearer ' + localStorage.getItem('key')
axios.defaults.baseURL = 'http://localhost:8000/api/';
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
    element: <Navigate to={'books'} />,
    errorElement: <Error />,
  },
  {
    element:<Home/>,
    errorElement: <Error />,
    children: [
      {
        path: "/books",
        element: <Book />,
      },
      {
        path: "/books/add",
        element: <AddBook />,
      },

    ]
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  
  <RouterProvider router={router} />
);
