// import React, { useContext, useEffect } from "react";
// import { AppContent } from "../Context/AppContex";

// const WelcomeUser = () => {
//   const { userData, getUserData, isLoggedin } = useContext(AppContent);

//   useEffect(() => {
//     // Ensure user data is fetched if not available
//     if (isLoggedin && !userData) {
//       getUserData();
//     }
//   }, [isLoggedin, userData, getUserData]);

//   return (
//     <div className="text-center mb-4">
//       {userData ? (
//         <h2 className="text-lg font-semibold text-gray-800">
//           Welcome, {userData.name.split(" ")[0]}!
//         </h2>
//       ) : (
//         <h2 className="text-lg font-semibold text-gray-800">Welcome!</h2>
//       )}
//     </div>
//   );
// };

// export default WelcomeUser;
