import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const Adminlayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <Topbar />

        {/* Page Content */}
        <main className="p-6 overflow-auto flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Adminlayout;
