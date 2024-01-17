import { useState, useEffect, useCallback } from "react";

const useAuth = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);

  const login = useCallback((usrId, usrName, token) => {
    setAccessToken(token);
    setUserId(usrId);
    setUserName(usrName);
    localStorage.setItem(
      "usersInfo",
      JSON.stringify({ accessToken: token, _id: usrId, name: usrName })
    );
  }, []);

  const logout = useCallback(() => {
    setAccessToken(null);
    setUserId(null);
    setUserName(null);
    localStorage.removeItem("usersInfo");
  }, []);

  useEffect(() => {
    const usersInfo = JSON.parse(localStorage.getItem("usersInfo"));
    if (usersInfo) {
      login(usersInfo?._id, usersInfo.name, usersInfo?.accessToken);
    }
  }, [login]);

  return { login, logout, accessToken, userId, userName };
};

export default useAuth;
