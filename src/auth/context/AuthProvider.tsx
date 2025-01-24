import { useState } from "react";
import { AuthContext, AuthStatusType } from "./index";
import { v4 } from "uuid";
interface User {
  id?: string;
  name?: string;
}
interface Props {
  children: JSX.Element;
}
export const AuthProvider = ({ children }: Props) => {
  // METODOS PARA ACTION
  const [authStatus, setauthStatus] = useState<AuthStatusType>(
    // AuthStatusType.UNAUTHENTICATED  //para estar en vista publica
    AuthStatusType.AUTHENTICATED // para estar en vista privada
  );
  const [user, setUser] = useState<User>({} as User);
  const handleLogout = () => {
    setauthStatus(AuthStatusType.UNAUTHENTICATED);
    setUser({} as User);
  };
  const handleLogin = (user: string) => {
    setauthStatus(AuthStatusType.AUTHENTICATED);
    setUser({ id: v4(), name: user } as User);
  };
  // ----------------------------------------
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
