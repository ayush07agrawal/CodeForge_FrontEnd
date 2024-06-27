import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootPage from "./Pages/RootPage";
import ErrorPage from "./Pages/ErrorPage";
import HomePage from "./Pages/HomePage";
import FrontPage from "./Pages/FrontPage";
import Lab from "./Pages/Lab";
import Profile from "./Pages/Profile";
import SolveQuestion, { loader as questionLoader } from "./Pages/SolveQuestion";
import Authentication from "./Pages/Authentication";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      {
        index:true,
        element: <FrontPage />,
      },
      { 
        path: "auth/:mode", 
        element: <Authentication /> 
      },
    ],
  },
  {
    path: "/home",
    element: <RootPage />,
    errorElement: <ErrorPage />,
    children: [
      { 
        index: true, 
        element: <HomePage /> 
      },
      {
        path: "question/:questionId",
        element: <SolveQuestion />,
        loader: questionLoader,
      },
      {
        path: "lab",
        element: <Lab />,
      },
      {
        path: "user/:userId",
        element: <Profile />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
