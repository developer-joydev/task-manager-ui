import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AuthContext from "./context/auth";
import useAuth from "./hooks/useAuth";
import PageRoutes from "./router";

function App() {
  const { accessToken, login, logout, userId, userName } = useAuth();
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!accessToken,
        accessToken: accessToken,
        login: login,
        logout: logout,
        userId: userId,
        userName: userName,
      }}
    >
      <Router>
        <PageRoutes />
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
