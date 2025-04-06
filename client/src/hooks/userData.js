import { useQuery } from "@tanstack/react-query";
import axios from "axios"; // Import axios

const getAccessToken = () => {
  return localStorage.getItem("token", data.token) || null;
};

const fetchUserData = async () => {
  const { data, status } = await axios.get(
    `http://localhost:5001/api/user/data`,
    {
      withCredentials: true,
    }
  );
  if (data.success) {
    return data.userData;
  } else {
    throw Exception("Unable to Fetch user data");
  }
};

export const useUserData = () => {
  return useQuery({
    queryKey: ["userData"],
    queryFn: fetchUserData,
  });
};

export const useIsUserLoggedIn = () => {
  return useQuery({
    queryKey: ["isUserLoggedIn"],
    queryFn: getAccessToken,
  });
};
