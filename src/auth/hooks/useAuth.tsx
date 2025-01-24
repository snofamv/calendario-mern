import { useContext } from "react";
import { AuthContext } from "../context";

export const useAuth = () => {
  const { authStatus, user, login, logout } = useContext(AuthContext);

  return {
    // DATA
    authStatus,
    user,
    // METHODS
    login,
    logout,
  };
};
