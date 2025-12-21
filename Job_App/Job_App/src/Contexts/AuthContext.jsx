import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";
import { NetWorkCalls } from "../Networks/network";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: Cookies.get("access_token"),
    isNew: Cookies.get("is_new") === "true",
  });

  const addAuth = async (payload) => {
    const res = await NetWorkCalls({
      endpoint: "auth",
      method: "POST",
      data: payload,
      ignoreCookie: true,
    });

    Cookies.set("access_token", res.token);
    Cookies.set("is_new", res.is_new);

    setAuth({
      token: res.token,
      isNew: res.is_new,
    });

    return res;
  };

  const logout = () => {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    Cookies.remove("is_new");
    setAuth({ token: null, isNew: false });
  };

  return (
    <AuthContext.Provider value={{ auth, addAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
