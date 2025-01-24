import { RouterProvider } from "react-router";
import { useAuth } from "./auth/hooks/useAuth";
import { AuthStatusType } from "./auth/context";
import { PrivateRoutes, PublicRoutes } from "./router";

const CalendarApp = () => {
  const { authStatus } = useAuth();
  const routesMap = {
    [AuthStatusType.AUTHENTICATED]: PrivateRoutes,
    [AuthStatusType.UNAUTHENTICATED]: PublicRoutes,
  };

  return <RouterProvider router={routesMap[authStatus] || PublicRoutes} />;
};

export default CalendarApp;
