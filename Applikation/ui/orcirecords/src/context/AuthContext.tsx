import React, { createContext, useState, useEffect, useContext } from "react";
import api, { setAuthHeader, clearAuthHeader } from "../api/axiosInstance";

interface AuthContextType {
  user: { username: string | null; roles: string[] };
  login: (user: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<{
    username: string | null;
    roles: string[];
  }>(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : { username: null, roles: [] };
  });

  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    setAuthHeader(username, password);

    try {
      const response = await api.get("/user/current");
      if (response.status === 200) {
        const userData = {
          username: response.data.username,
          roles: response.data.roles,
        };

        localStorage.setItem("user", JSON.stringify(userData));

        setUser(userData);
        return true;
      }
    } catch (error) {
      console.error("Login failed:", error);
      clearAuthHeader();
      return false;
    }
    return false;
  };

  const logout = () => {
    clearAuthHeader();
    localStorage.removeItem("user");
    setUser({ username: null, roles: [] });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
