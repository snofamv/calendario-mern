import { createContext } from "react";
export enum AuthStatusType {
  AUTHENTICATED = "AUTHENTICATED",
  UNAUTHENTICATED = "UNAUTHENTICATED",
}
interface AuthContextProps {
  authStatus: AuthStatusType;
  user: { id?: string; name?: string };
  login: (username: string) => void;
  logout: () => void;
}
export const AuthContext = createContext<AuthContextProps>({
  authStatus: AuthStatusType.UNAUTHENTICATED,
} as AuthContextProps);
