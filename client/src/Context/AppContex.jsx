

// import { createContext, useEffect, useState } from "react";
// import axios from "axios"; // Import axios
// import { toast } from "react-toastify";

// // Create the context
// export const AppContent = createContext();


// export const AppContexProvider = (props) => {
//   // Load the backend URL from environment variables with a fallback

//   axios.defaults.withCredentials = true;

//   const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

//   // Global state
//   const [isLoggedin, setIsLoggedin] = useState(false);
//   const [userData, setUserData] = useState(null);

//   // Check if the user is authenticated
//   // const getAuthState = async () => {
//   //   try {
//   //     const { data } = await axios.get(`${backendUrl}/api/auth/is-auth`, {
//   //       withCredentials: true,
//   //     });
//   //     if (data.success) {
//   //       setIsLoggedin(true);
//   //       getUserData(); // Fetch user data if authenticated
//   //     } else {
//   //       setIsLoggedin(false);
//   //     }
//   //   } catch (error) {
//   //     console.error("Error checking auth state:", error.message);
//   //     toast.error(error.message || "Failed to check authentication state.");
//   //   }
//   // };

//   const getAuthState = async () => {
//     try {
//       const { data } = await axios.get(`${backendUrl}/api/auth/is-auth`, {
//         withCredentials: true,
//       });
//       if (data.success) {
//         setIsLoggedin(true);
//         getUserData(); // Fetch user data if authenticated
//       } else {
//         setIsLoggedin(false);
//       }
//     } catch (error) {
//       console.error("Error checking auth state:", error.message);
//       toast.error(error.message || "Failed to check authentication state.");
//     }
//   };
  

//   // Fetch user data
//   const getUserData = async () => {
//     try {
//       const { data } = await axios.get(`${backendUrl}/api/user/data`, {
//         withCredentials: true,
//       });
//       if (data.success) {
//         setUserData(data.userData); // Save user data
//       } else {
//         toast.error(data.message || "Failed to fetch user data.");
//       }
//     } catch (error) {
//       console.error("Error fetching user data:", error.message);
//       toast.error(error.message || "Failed to fetch user data.");
//     }
//   };

//   // Use `useEffect` to check authentication state when the app loads
//   useEffect(() => {
//     getAuthState();
//   }, []);

//   // Values provided by the context
//   const value = {
//     backendUrl,
//     isLoggedin,
//     setIsLoggedin,
//     userData,
//     setUserData,
//   };

//   // Debug backend URL and state
//   console.log("Backend URL:", backendUrl);
//   console.log("Is Logged In:", isLoggedin);
//   console.log("User Data:", userData);

//   return (
//     <AppContent.Provider value={value}>
//       {props.children}
//     </AppContent.Provider>
//   );
// };

// export default AppContexProvider;


import { createContext, useEffect, useState } from "react";
import axios from "axios"; // Import axios
import { toast } from "react-toastify";

// Create the context
export const AppContent = createContext();

export const AppContexProvider = (props) => {
  axios.defaults.withCredentials = true;
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5001";

  // Global state
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(null);

  // Fetch user data
  const getUserData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/data`, {
        withCredentials: true,
      });
      if (data.success) {
        setUserData(data.userData); // Save user data
      } else {
        toast.error(data.message || "Failed to fetch user data.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error.message);
      toast.error(error.message || "Failed to fetch user data.");
    }
  };

  // Check if the user is authenticated
  const getAuthState = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/auth/is-auth`, {
        withCredentials: true,
      });
      if (data.success) {
        setIsLoggedin(true);
        await getUserData(); // Fetch user data if authenticated
      } else {
        setIsLoggedin(false);
      }
    } catch (error) {
      console.error("Error checking auth state:", error.message);
      toast.error(error.message || "Failed to check authentication state.");
    }
  };

  // Use `useEffect` to check authentication state when the app loads
  useEffect(() => {
    getAuthState();
  }, []);

  // Values provided by the context
  const value = {
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    getUserData // Add this to make getUserData available in context
  };

  // Debug backend URL and state
  console.log("Backend URL:", backendUrl);
  console.log("Is Logged In:", isLoggedin);
  console.log("User Data:", userData);

  return (
    <AppContent.Provider value={value}>
      {props.children}
    </AppContent.Provider>
  );
};

export default AppContexProvider;
