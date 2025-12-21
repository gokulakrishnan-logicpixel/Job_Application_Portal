import { createContext, useContext } from "react";
import { NetWorkCalls } from "../Networks/network";

const AdminContext = createContext(null);

export const AdminProvider = ({ children }) => {
  const addAdmin = (data) =>
    NetWorkCalls({ endpoint: "admin", method: "POST", data });

  const updateAdmin = (data) =>
    NetWorkCalls({ endpoint: "admin", method: "PUT", data });

  const getAdmins = () =>
    NetWorkCalls({ endpoint: "admin", method: "GET" });

  const getAdminById = () =>
    NetWorkCalls({ endpoint: "admin/id", method: "GET" });

  return (
    <AdminContext.Provider
      value={{ addAdmin, updateAdmin, getAdmins, getAdminById }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
