import React from 'react'

export default function Topbar() {
  return (
   <header className="bg-white p-4 shadow-md flex justify-between items-center">
      {/* Page Title */}
      <h1 className="text-lg font-semibold text-gray-700">Admin Panel</h1>

      {/* Right Side: Profile / Logout */}
      <div className="flex items-center gap-4">
        {/* Notification Icon (optional) */}
        <button className="text-gray-600 hover:text-sky-400 transition-colors">
          🔔
        </button>

        {/* Profile */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-300"></div>
          <span className="text-gray-600 font-medium">Admin</span>
        </div>

        {/* Logout */}
        <button className="text-gray-600 hover:text-sky-400 transition-colors">
          Logout
        </button>
      </div>
    </header>
  );
}
