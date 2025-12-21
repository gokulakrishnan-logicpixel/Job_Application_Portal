import { createContext, useContext } from "react";
import { NetWorkCalls } from "../Networks/network";

const JobContext = createContext(null);
const JOBSERVICEURL="http://127.0.0.1:8002";
export const JobProvider = ({ children }) => {
  // PUBLIC (candidate)
  const getAllJobs = () =>
    NetWorkCalls({
        baseBackendUrl:JOBSERVICEURL,
      endpoint: "jobs",
      method: "GET",
    });

  const getJobById = (jobId) =>
    NetWorkCalls({
        baseBackendUrl:JOBSERVICEURL,
      endpoint: `jobs/${jobId}`,
      method: "GET",
    });

  // ADMIN
  const createJob = (data) =>
    NetWorkCalls({
        baseBackendUrl:JOBSERVICEURL,
      endpoint: "jobs",
      method: "POST",
      data,
    });

  const getMyJobs = () =>
    NetWorkCalls({
        baseBackendUrl:JOBSERVICEURL,
      endpoint: "jobs/emails",
      method: "GET",
    });

  const updateJob = (data) =>
    NetWorkCalls({
        baseBackendUrl:JOBSERVICEURL,
      endpoint: "jobs",
      method: "PATCH",
      data,
    });

  const deleteJob = (jobId) =>
    NetWorkCalls({
        baseBackendUrl:JOBSERVICEURL,
      endpoint: `jobs/${jobId}`,
      method: "DELETE",
    });

  return (
    <JobContext.Provider
      value={{
        // public
        getAllJobs,
        getJobById,

        // admin
        createJob,
        getMyJobs,
        updateJob,
        deleteJob,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export const useJob = () => useContext(JobContext);
