import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import NewProject from "./pages/NewProject";
// import Lost from "./pages/Lost";
import Users from "./pages/Users";
import Milestone from "./pages/Milestone";
import CurrentProject from "./pages/CurrentProject";
import ArchiveProject from "./pages/ArchiveProject";
import CurrentRequest from "./pages/CurrentRequest";
import Logout from "./pages/Logout";
import SingleMileStone from "./pages/CurrentRequest/SingleMileStone"
import Recap from "./pages/CurrentRequest/Recap";

const routesDefination = {
  publicRoutes: [
    {
      path: "/",
      component: <Login />,
    },
  ],
  privateRoutes: [
    {
      path: "/home",
      component: <Home />,
    },
    {
      path: "/new-project",
      component: <NewProject />,
    },
    {
      path: "/users",
      component: <Users />,
    },
    {
      path: "/milestone",
      component: <Milestone />,
    },
    {
      path: "/requestSingleMilestone/:milestonename",
      component: <SingleMileStone />,
    },
    {
      path: "/recap/:milestonename",
      component: <Recap />,
    },
    {
      path: "/current-projects",
      component: <CurrentProject />,
    },
    {
      path: "/archive-projects",
      component: <ArchiveProject />,
    },
    {
      path: "/current-request",
      component: <CurrentRequest />,
    },
    {
      path: "/logout",
      component: <Logout />,
    },
  ],
};

const ProtectedRoute = () => {
  const userData = JSON.parse(localStorage.getItem("user-auth"));

  if (!userData) {
    window.location.pathname = "/";
  }
  return userData.user.providerData[0].uid ? (
    <Outlet context={userData} />
  ) : (
    <Navigate to="/" replace />
  );
};

const ApplicationRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {routesDefination.publicRoutes.map((r, idx) => {
          return (
            <Route
              path={r.path}
              element={<>{r.component}</>}
              exact
              key={idx}
            ></Route>
          );
        })}

        <Route
          path="*"
          element={
            <>
              {/* <Lost /> */}
            </>
          }
        ></Route>

        <Route exact path="/" element={<ProtectedRoute />}>
          {routesDefination.privateRoutes.map((r, idx) => {
            return (
              <Route
                path={r.path}
                element={<>{r.component}</>}
                exact
                key={idx}
              ></Route>
            );
          })}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default ApplicationRoutes;
