// src/pages/Dashboard.jsx
import React from "react";
import DashboardLayout from "./Dashboardlayout";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const Dashboard = () => {
  // Sample datax
  const bookingsData = [
    { month: "Jan", bookings: 30 },
    { month: "Feb", bookings: 45 },
    { month: "Mar", bookings: 60 },
    { month: "Apr", bookings: 50 },
    { month: "May", bookings: 70 },
    { month: "Jun", bookings: 90 },
  ];

  const topDestinations = [
    { name: "Paris", value: 40 },
    { name: "Bali", value: 30 },
    { name: "New York", value: 20 },
    { name: "Tokyo", value: 10 },
  ];

  const COLORS = ["#38BDF8", "#34D399", "#60A5FA", "#FBBF24"];

  return (
    <DashboardLayout>
      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-500 text-sm">Total Bookings</p>
          <h2 className="text-2xl font-semibold">250</h2>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-500 text-sm">Revenue</p>
          <h2 className="text-2xl font-semibold">$12,400</h2>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-500 text-sm">Users</p>
          <h2 className="text-2xl font-semibold">180</h2>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-500 text-sm">Destinations</p>
          <h2 className="text-2xl font-semibold">35</h2>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart: Monthly Bookings */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-gray-700 font-semibold mb-4">Monthly Bookings</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={bookingsData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Line type="monotone" dataKey="bookings" stroke="#38BDF8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart: Top Destinations */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-gray-700 font-semibold mb-4">Top Destinations</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={topDestinations}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#38BDF8"
                label
              >
                {topDestinations.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
