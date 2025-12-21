import { createContext, useContext } from "react";
import { NetWorkCalls } from "../Networks/network";

const ApplicationContext = createContext(null);

const JOBSERVICEURL="http://127.0.0.1:8002";
export const ApplicationProvider = ({ children }) => {
  // CANDIDATE
  const applyJob = (data) =>
    NetWorkCalls({
      baseBackendUrl:JOBSERVICEURL,
      endpoint: "applications/apply",
      method: "POST",
      data,
    });

  const getMyApplications = () =>
    NetWorkCalls({
        baseBackendUrl:JOBSERVICEURL,
      endpoint: "applications/emails",
      method: "GET",
    });

  // ADMIN
  const getApplicationsByJob = (jobId) =>
    NetWorkCalls({
        baseBackendUrl:JOBSERVICEURL,
      endpoint: `applications/jobs/${jobId}`,
      method: "GET",
    });

  const updateApplicationStatus = (data) =>
    NetWorkCalls({
        baseBackendUrl:JOBSERVICEURL,
      endpoint: "applications/job/status",
      method: "PATCH",
      data,
    });

  return (
    <ApplicationContext.Provider
      value={{
        applyJob,
        getMyApplications,
        getApplicationsByJob,
        updateApplicationStatus,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplication = () => useContext(ApplicationContext);
