import { useQuery } from "@tanstack/react-query";
import axios from "axios"; // Import axios

const fetchTutors = async () => {
  const { data, status } = await axios.get(
    `http://localhost:5001/api/user/Approvedtutors`,
    {
      withCredentials: true,
    }
  );
  return data.tutors;
};

export const useTutors = () => {
  return useQuery({
    queryKey: ["useTutors"],
    queryFn: fetchTutors,
  });
};
