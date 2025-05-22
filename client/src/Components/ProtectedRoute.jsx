import { useUserData } from "../hooks/userData";
import { Navigate } from "react-router-dom";
export const ProtectedRoute = ({ children, protectionType }) => {
  const {
    data: user,
    error: userError,
    isLoading: userDataLoading,
    isFetched: userDataFetched,
    isSuccess: userDataSuccess,
    status: userStatus,
  } = useUserData();

  console.log("isFetched", userDataFetched);
  console.log(user)

  if (userDataSuccess && userDataFetched) {
    if (protectionType == "admin") {
      if (!user.isAdmin) {
        return <Navigate to={"/"} replace />;
      }
      if (protectionType == "tutor") {
        if (user.role !== "tutor") {
          return <Navigate to={"/"} replace />;
        }
      }
    }

    return children;
  }

  if (userDataFetched && !userDataSuccess) {
    return <Navigate to={"/"} replace />;
  }

  return <></>;
};
