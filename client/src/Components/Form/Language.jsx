// import {  Globe } from 'lucide-react';
// import React, { useState } from 'react';

// function Language() {

//   const [selectedLanguages, setSelectedLanguages] = useState([]);
    
  
//     const languages = [
//       "English", "Nepali", "Hindi"
//     ];
  
//     const availableTimeSlots = [
//       "02:00 PM", "04:00 PM", "06:00 PM", "08:00 PM"
//     ];
    
//   return (
//     <div className="Container">
//       <div className="relative">
//         <div className="flex items-center space-x-2 mb-6">
//           <Globe className="w-6 h-6 text-blue-600" />
//           <h3 className="text-xl font-semibold text-gray-900">
//             Languages 
//           </h3>
//         </div>
//         <div className="bg-gradient-to-r from-blue-50 to-violet-50 rounded-xl p-6 border border-blue-100">
//           <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
//             {languages.map((language) => (
//               <label
//                 key={language}
//                 className={`relative flex items-center p-4 rounded-lg cursor-pointer hover:bg-white/50 transition-all ${
//                   selectedLanguages.includes(language)
//                     ? "bg-white shadow-sm border border-blue-200"
//                     : ""
//                 }`}
//               >
//                 <input
//                   type="checkbox"
//                   checked={selectedLanguages.includes(language)}
//                   onChange={(e) => {
//                     if (e.target.checked) {
//                       setSelectedLanguages([...selectedLanguages, language]);
//                     } else {
//                       setSelectedLanguages(
//                         selectedLanguages.filter((l) => l !== language)
//                       );
//                     }
//                   }}
//                   className="h-4 w-4 rounded border-blue-300 text-blue-600 focus:ring-blue-500"
//                 />
//                 <span className="ml-3 font-medium text-gray-700">
//                   {language}
//                 </span>
//               </label>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Language;



import { Globe } from 'lucide-react';
import React from 'react';

function Language({ selectedLanguages, onLanguageChange }) {
  const languages = ["English", "Nepali", "Hindi"];

  return (
    <div className="Container">
      <div className="relative">
        <div className="flex items-center space-x-2 mb-6">
          <Globe className="w-6 h-6 text-blue-600" />
          <h3 className="text-xl font-semibold text-gray-900">Languages</h3>
        </div>
        <div className="bg-gradient-to-r from-blue-50 to-violet-50 rounded-xl p-6 border border-blue-100">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {languages.map((language) => (
              <label key={language} className="relative flex items-center p-4 rounded-lg cursor-pointer hover:bg-white/50 transition-all">
                <input
                  type="checkbox"
                  checked={selectedLanguages.includes(language)}
                  onChange={(e) => {
                    let updatedLanguages = e.target.checked
                      ? [...selectedLanguages, language]
                      : selectedLanguages.filter((l) => l !== language);
                      onLanguageChange(updatedLanguages);
                  }}
                  className="h-4 w-4 rounded border-blue-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-3 font-medium text-gray-700">{language}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Language;
