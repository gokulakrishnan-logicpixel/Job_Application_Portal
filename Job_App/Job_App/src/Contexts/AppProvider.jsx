import { AuthProvider } from "./AuthContext";
import { UserProvider } from "./UserContext";
import { AdminProvider } from "./AdminContext";
import { JobProvider } from "./JobContext";
import { ApplicationProvider } from "./ApplicationContext";

const AppProvider = ({ children }) => {
  return (
    <AuthProvider>
      <UserProvider>
        <AdminProvider>
          <JobProvider>
            <ApplicationProvider>
              {children}
            </ApplicationProvider>
          </JobProvider>
        </AdminProvider>
      </UserProvider>
    </AuthProvider>
  );
};

export default AppProvider;
