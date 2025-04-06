import React from 'react';
import NavBar from './NavBar/NavBar';
import TutorVerificationStatus from './TutorVerificationStatus';
import RecentTransactions from './RecentTransactions';
import DashboardWidgets from './DashboardWidgets';

function MainContent() {
  return (
    <div className="flex-1 overflow-auto">  {/* Changed from overflow-hidden to overflow-auto if needed */}
      <NavBar />
      <div className="p-5">
        <DashboardWidgets/>

        <div className="flex gap-4">
          <TutorVerificationStatus />
          <RecentTransactions />
          
        </div>
        
       
      </div>
    </div>
  );
}

export default MainContent;
