import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Authenticate from "./pages/Authenticate";
import AuthContext from "./context/auth";
import TaskLists from "./components/TaskLists";

const PageRoutes = () => {
  const authContext = useContext(AuthContext);
  const AuthRoutes = () => {
    return (
      <Routes>
        <Route path="/" exact element={<TaskLists />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  };

  const UnAuthRoutes = () => {
    return (
      <Routes>
        <Route path="/" exact element={<Authenticate />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  };
  if (authContext?.accessToken) {
    return <AuthRoutes />;
  }
  return <UnAuthRoutes />;
};

export default PageRoutes;
