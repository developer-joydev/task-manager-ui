import { createContext } from "react";

const AuthContext = createContext({
  userId: null,
  userName: null,
  accessToken: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export default AuthContext;
