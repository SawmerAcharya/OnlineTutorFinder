import React from 'react';
import Main from './Main';
import SlideBars from './SlideBars';

const TutorDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <SlideBars />
      <Main />
      
    </div>
  );
}

export default TutorDashboard;
