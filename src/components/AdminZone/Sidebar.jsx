import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, Users, Briefcase, BarChart, Star , PackageCheck , NotebookTabs , RotateCcwKey , LogOut } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate(); 

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    navigate('/admin/login');
  };

  const menu = [
    { name: "Dashboard", icon: <Home size={20} />, path: "/admin/dashboard" },
    { name: "Bookings", icon: <Briefcase size={20} />, path: "/admin/bookings" },
    { name: "Destinations", icon: <BarChart size={20} />, path: "/admin/destinations" },
    { name: "Packages Management", icon: <PackageCheck size={20} />, path: "/admin/packagesmgmt" },
    { name: "Contact Management", icon: <NotebookTabs size={20} />, path: "/admin/contactmgmt" },
    { name: "Users", icon: <Users size={20} />, path: "/admin/users" },
    { name: "Change password", icon: <RotateCcwKey size={20} />, path: "/admin/changepassword" },
    { name: "Logout", icon: <LogOut size={20} />, path: "/admin/logout" },
  ];

  return (
    <aside className="w-70 bg-white shadow-md min-h-screen p-6">
      <h2 className="text-2xl font-bold text-gray-700 mb-8">Adventure & Freedom</h2>

      <nav className="flex flex-col gap-4">
        {menu.map((item) => {
          const isActive = location.pathname === item.path;

          // If this is the Logout button, call handleLogout instead of navigating
          if (item.name === "Logout") {
            return (
              <button
                key={item.name}
                onClick={handleLogout}
                className="flex items-center gap-3 font-medium text-gray-600 hover:text-sky-400"
              >
                {item.icon}
                {item.name}
              </button>
            );
          }

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 font-medium transition-colors ${
                isActive ? "text-sky-500" : "text-gray-600 hover:text-sky-400"
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
