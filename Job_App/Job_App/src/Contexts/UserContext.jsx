import { createContext, useContext } from "react";
import { NetWorkCalls } from "../Networks/network";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const addUser = (data) =>
    NetWorkCalls({ endpoint: "user", method: "POST", data });

  const updateUser = (data) =>
    NetWorkCalls({ endpoint: "user", method: "PUT", data });

  const getUsers = () =>
    NetWorkCalls({ endpoint: "user", method: "GET" });

  const getUserById = () =>
    NetWorkCalls({ endpoint: "user/id", method: "GET" });

  return (
    <UserContext.Provider
      value={{ addUser, updateUser, getUsers, getUserById }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
