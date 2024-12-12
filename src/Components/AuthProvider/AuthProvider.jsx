import { useContext, createContext, useState, useEffect } from "react";
import React from "react";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { clearUser } from "../../Redux/actions";

const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    return storedAuth ? JSON.parse(storedAuth) : false;
  });
  // console.log(isAuthenticated);
  const dispatch = useDispatch();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setIsAuthenticated(true);
      const decodedToken = jwtDecode(accessToken);
      setUserId(decodedToken.id);
      const currentTime = Date.now / 1000;
      if (decodedToken.exp < currentTime) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userName");
        localStorage.removeItem("userId");
        localStorage.removeItem("isAuthenticated");
        dispatch(clearUser());
      } else {
        setIsAuthenticated(true);
      }
    }
  }, []);

  const logOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    dispatch(clearUser());
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
