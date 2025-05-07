import React, { createContext, useContext, useEffect, useState } from "react";

import { checkValidUserInfo } from "utils/common";

import { AuthContextType, AuthProviderProps, UserInfo } from "interface";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const initalUserInfo = {
    exp: 0,
    user: {
      username: "",
    },
  };
  const [userInfo, setUserInfo] = useState<UserInfo>(initalUserInfo);

  useEffect(() => {
    const checkUserInfo = localStorage.getItem("egp_user");
    const userInfo = checkUserInfo && JSON.parse(checkUserInfo);
    if (userInfo) {
      setUserInfo(userInfo);
    }
  }, []);

  const login = (userInfo: UserInfo) => {
    setUserInfo(userInfo);
  };

  const logout = () => {
    localStorage.removeItem("egp_user");
    localStorage.removeItem("edp_checkAdmin");
    setUserInfo(initalUserInfo);
  };

  const isAuthenticated = checkValidUserInfo(userInfo);

  const verifyAdminPassword = async (input: string): Promise<boolean> => {
    const correctPassword = "admin123";
    const checkCondition = input === correctPassword;
    localStorage.setItem("edp_checkAdmin", checkCondition.toString());
    return input === correctPassword;
  };

  return (
    <AuthContext.Provider value={{ userInfo, isAuthenticated, login, logout, verifyAdminPassword }}>
      {children}
    </AuthContext.Provider>
  );
};
