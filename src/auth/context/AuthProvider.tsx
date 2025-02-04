import { useState, useEffect } from "react";
import { AuthContext, AuthStatusType } from "./index";

interface Props {
  children: JSX.Element;
}

export interface User {
  _id: string;
  name: string;
}

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User>({} as User);
  const [authStatus, setAuthStatus] = useState<AuthStatusType>(
    AuthStatusType.UNAUTHENTICATED
  );

  // Cargar datos del usuario desde localStorage al montar el componente
  useEffect(() => {
    const storage = localStorage.getItem("isLogged");
    if (storage) {
      try {
        const parsedStorage = JSON.parse(storage);
        if (parsedStorage.isLogged && parsedStorage.user) {
          setUser({
            _id: parsedStorage.user._id,
            name: parsedStorage.user.name,
          });
          setAuthStatus(AuthStatusType.AUTHENTICATED);
        }
      } catch (error) {
        console.error("Error al parsear localStorage:", error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLogged");
    setAuthStatus(AuthStatusType.UNAUTHENTICATED);
    setUser({} as User);
  };

  const handleLogin = (params: any) => {
    if (!params.success) return;

    const newUser = {
      _id: params.msg.uid,
      name: params.msg.name,
    };

    localStorage.setItem(
      "isLogged",
      JSON.stringify({
        isLogged: true,
        user: newUser,
        token: params.msg.token,
      })
    );

    setUser(newUser);
    setAuthStatus(AuthStatusType.AUTHENTICATED);
  };

  return (
    <AuthContext.Provider
      value={{
        authStatus,
        user,
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
