// import React from "react";
// import {  MapPin, Globe, Briefcase, ExternalLink } from 'lucide-react';

// export default function LocationCard() {
//   return (
//     <div className="bg-white rounded-xl shadow-md p-6">
//       <h2 className="text-xl font-bold text-gray-800 mb-4">
//         Tutoring Locations
//       </h2>

//       <div className="space-y-3">
//         <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//           <div className="flex items-center">
//             <Globe size={18} className="text-indigo-500 mr-3" />
//             <span className="text-gray-700">Online</span>
//           </div>
//           <div className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
//             Available
//           </div>
//         </div>

//         <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//           <div className="flex items-center">
//             <MapPin size={18} className="text-indigo-500 mr-3" />
//             <span className="text-gray-700">Offline</span>
//           </div>
//           <div className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
//             Available
//           </div>
//         </div>

//         <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//           <div className="flex items-center">
//             <Briefcase size={18} className="text-indigo-500 mr-3" />
//             <span className="text-gray-700">Student place</span>
//           </div>
//           <div className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
//             Available
//           </div>
//         </div>

//         <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//           <div className="flex items-center">
//             <MapPin size={18} className="text-indigo-500 mr-3" />
//             <span className="text-gray-700">Tutor place</span>
//           </div>
//           <div className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
//             Available
//           </div>
//         </div>
//       </div>

//       {/* <div className="mt-6">
//         <a
//           href="https://tinyurl.com/2s3bcp35"
//           target="_blank"
//           rel="noopener noreferrer"
//           className="block w-full text-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
//         >
//           <div className="flex items-center justify-center">
//             <ExternalLink size={16} className="mr-2" />
//             <span>View full profile</span>
//           </div>
//         </a>
//       </div> */}
//     </div>
//   );
// }

// import React from "react";
// import { MapPin, Globe, Briefcase } from "lucide-react";

// function LocationItem({ icon, label }) {
//   return (
//     <div className="flex items-center justify-between p-3 bg-[#fde9d3] rounded-lg group transition-all">
//       <div className="flex items-center font-medium">
//         <div className="text-gray-400 group-hover:text-orange-400 mr-3 transition-colors">
//           {icon}
//         </div>
//         <span className="text-[#ca7c2e]">{label}</span>
//       </div>
//       <div className="bg-[#fcd9b6] text-orange-500 px-2 py-1 rounded-full text-xs font-semibold transition-colors">
//         Available
//       </div>
//     </div>
//   );
// }

// export default function LocationCard() {
//   return (
//     <div className="bg-white rounded-xl shadow-md p-6 border border-[#fde9d3]">
//       <h2 className="text-xl font-bold text-[#ca7c2e] mb-4">
//         Tutoring Locations
//       </h2>

//       <div className="space-y-3">
//         <LocationItem icon={<Globe size={18} />} label="Online" />
//         <LocationItem icon={<MapPin size={18} />} label="Offline" />
//         <LocationItem icon={<Briefcase size={18} />} label="Student place" />
//         <LocationItem icon={<MapPin size={18} />} label="Tutor place" />
//       </div>

//       {/* Optional View Profile Link */}
//       {/* 
//       <div className="mt-6">
//         <a
//           href="https://tinyurl.com/2s3bcp35"
//           target="_blank"
//           rel="noopener noreferrer"
//           className="block w-full text-center bg-[#fde9d3] hover:bg-[#fcd9b6] text-[#ca7c2e] font-medium py-2 px-4 rounded-lg transition-colors"
//         >
//           <div className="flex items-center justify-center">
//             <ExternalLink size={16} className="mr-2" />
//             <span>View full profile</span>
//           </div>
//         </a>
//       </div>
//       */}
//     </div>
//   );
// }

