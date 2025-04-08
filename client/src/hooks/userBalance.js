import { useQuery } from "@tanstack/react-query";
import axios from "axios"; // Import axios



const fetchUserBalance = async () => {
  const { data, status } = await axios.get(
    `http://localhost:5001/api/payments/balance`,
    {
      withCredentials: true,
    }
  );
  if (data.success) {
    return data.balance;
  } else {
    throw Exception("Unable to Fetch user data");
  }
};


export const useBalance = () => {
  return useQuery({
    queryKey: ["userBalance"],
    queryFn: fetchUserBalance,
    refetchOnWindowFocus: true,
    // enabled: false,
  });
};