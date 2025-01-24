import { createBrowserRouter, Navigate } from "react-router";
import { LoginPage } from "../auth";
import { CalendarPage } from "../calendar";

export const PrivateRoutes = createBrowserRouter([
  {
    path: "/calendar/*",
    Component: CalendarPage,
  },
  { path: "/*", element: <Navigate to={"/calendar"} /> },
]);
export const PublicRoutes = createBrowserRouter([
  {
    path: "/*",
    element: <Navigate to={"/auth/login"} />,
  },
  {
    path: "/auth",

    children: [
      {
        index: true,
        element: <Navigate to={"login"} />,
      },
      {
        path: "login",
        Component: LoginPage,
      },
      {
        path: "*",
        element: <Navigate to={"/auth/login"} />,
      },
    ],
  },
]);
