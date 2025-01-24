import React, { Suspense, lazy, useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { server } from './Assests/config.js';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { userExists, userNotExists } from './redux/reducers/auth.js';
import { LayoutLoader } from './Components/Loaders.jsx'
import ProtectRoute from './Components/Auth/ProtectRoute.jsx'

const TeacherHome = lazy(()=> import("./Pages/Teacher/TeacherHome.js"))
const CreateLab = lazy(() => import("./Components/CreateLab.js"));
const FrontPage = lazy(() => import("./Pages/FrontPage.js"));
const FrontPageUpdated = lazy(() => import("./Pages/FrontPageUpdated.js"));
const RootPage = lazy(() => import("./Pages/RootPage.js"));
const ErrorPage = lazy(() => import("./Pages/ErrorPage.js"));
const HomePage = lazy(() => import("./Pages/HomePage.js"));
const Lab = lazy(() => import("./Pages/Lab.js"));
const Profile = lazy(() => import("./Pages/Profile.js"));
const SolveQuestion = lazy(() => import("./Pages/SolveQuestion.js"));
const Authentication = lazy(() => import("./Pages/Authentication.js"));
const QuestionForm = lazy(() => import("./Pages/Teacher/QuestionForm.js"));

function App() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  
  useEffect(() => {
    axios
      .get(`${server}/api/v1/user/me`, { withCredentials: true })
      .then(({ data }) => dispatch(userExists(data.user)) )
      .catch((err) => dispatch(userNotExists()) )
  }, [dispatch])

  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectRoute user = {!user} redirect = '/app' />,
      errorElement: <ErrorPage />,
      children: [
        // { index: true, element: <FrontPage />, },
        { index: true, element: <FrontPageUpdated />, },
        { path: "auth/:mode",  element: <Authentication /> },
      ],
    },
    {
      path: "/app",
      element: <ProtectRoute user = {user} />,
      errorElement: <ErrorPage />,
      children: [
        {
          element: <RootPage />,
          children: [
            { index: true, element: (user?.role === "teacher" ? <TeacherHome /> : <HomePage />) },
            { path: "question/:questionId", element: <SolveQuestion /> },
            { path: "lab", element: <Lab /> },
            { path: "user/:userId", element: <Profile /> },
            { path: "questionform/:type", element: <QuestionForm /> },
            { path: "createlab", element: <CreateLab /> },
          ]
        },
      ],
    },
  ]);

  return (
    <>
      <Suspense fallback = {<LayoutLoader />}>
        <RouterProvider router={router}/>
      </Suspense>
      <Toaster position = 'bottom-center' />
    </>
  );
}

export default App;