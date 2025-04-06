// import React from "react";
// import Nav from "./Nav";
// import Widgets from "./Widgets";
// import SessionsList from "./SessionList";
// import RecentMessages from "./RecentMessages";
// import PaymentHistory from "./PaymentHistory";

// function Main() {
//   return (
//     <div className="flex-1 overflow-auto">
//       <Nav />
//       <div className="px-5 py-3">
//         <Widgets />
//         <div className="flex gap-9 mt-8"> 
//           <SessionsList />
//           <RecentMessages />
//         </div>
//         <PaymentHistory />
//       </div>
//     </div>
//   );
// }

// export default Main;


import React from "react";
import Nav from "./Nav";
import Widgets from "./Widgets";
import SessionsList from "./SessionList";
import RecentMessages from "./RecentMessages";
import PaymentHistory from "./PaymentHistory";

function Main() {
  return (
    <div className="flex-1 overflow-auto">
      <Nav />
      <div className="p-5">
        <Widgets />

        {/* Adjusting the flex container to manage gaps and alignment */}
        <div className="grid grid-cols-2 gap-6 mt-8">
          <SessionsList />
          <RecentMessages />
        </div>

        <PaymentHistory />
      </div>
    </div>
  );
}

export default Main;

