import React from 'react';
import Sidebar from './Slidebar';
import NavBar from './NavBar';
import MainContent from './MainContent';

function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <MainContent />
      
    </div>
  );
}

export default Dashboard;
