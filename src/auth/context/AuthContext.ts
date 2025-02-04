import { createContext } from "react";
import { User } from "./AuthProvider";
export enum AuthStatusType {
  AUTHENTICATED = "AUTHENTICATED",
  UNAUTHENTICATED = "UNAUTHENTICATED",
}
interface AuthContextProps {
  authStatus: AuthStatusType;
  user: User;
  login: (params: any) => void;
  logout: () => void;
}
export const AuthContext = createContext<AuthContextProps>({
  authStatus: AuthStatusType.UNAUTHENTICATED,
} as AuthContextProps);
