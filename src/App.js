import React from 'react';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootPage from "./Pages/RootPage";
import ErrorPage from "./Pages/ErrorPage";
import HomePage from "./Pages/HomePage";
import Lab from "./Pages/Lab";
import Profile from "./Pages/Profile";
import SolveQuestion, {loader as questionLoader} from "./Pages/SolveQuestion";
// import {action as checkSolution} from "./Components/CodeEditor";


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "question/:questionId",
        element: <SolveQuestion />,
        loader:questionLoader,
        // action: checkSolution,
      },
      {
        path: "lab",
        element: <Lab />,
      },
      {
        path: ":userId",
        element: <Profile />
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
