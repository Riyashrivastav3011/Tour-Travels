import React, { useState, useEffect } from "react";
import DashboardLayout from "./Dashboardlayout";
import axios from "axios";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    showBookings();
  }, []);

  const showBookings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/admin/bookings");
      setBookings(res.data);
      console.log(res.data);
    } catch (err) {
      console.log("Error loading bookings", err);
    }
  };

  return (
    <DashboardLayout>
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        Bookings Management
      </h2>

      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full text-left border-collapse">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-gray-500 font-medium">Booking ID</th>
              <th className="p-3 text-gray-500 font-medium">Name</th>
              <th className="p-3 text-gray-500 font-medium">Email</th>
              <th className="p-3 text-gray-500 font-medium">Phone</th>
              <th className="p-3 text-gray-500 font-medium">Travelers</th>
              <th className="p-3 text-gray-500 font-medium">Date</th>
              <th className="p-3 text-gray-500 font-medium">Package</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((b) => (
              <tr key={b._id} className="border-t">
                <td className="p-3">{b._id}</td>
                <td className="p-3">{b.name}</td>
                <td className="p-3">{b.email}</td>
                <td className="p-3">{b.phone}</td>
                <td className="p-3">{b.travelers}</td>
                <td className="p-3">{b.date}</td>
                <td className="p-3">{b.packageId?.description || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

export default Bookings;
