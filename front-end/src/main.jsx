import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    element: <p>Hi !!! 🐸</p>,
    path: "/", // This is the root path
  },
  {
    element: <i>Bye !!! 🐨</i>,
    path: "/bye", // This is the /bye path
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
