import React, { useState } from "react";
import DashboardLayout from './Dashboardlayout'

const Reviews = () => {
  const [reviews, setReviews] = useState([
    {
      id: "R001",
      user: "John Doe",
      destination: "Paris",
      rating: 5,
      comment: "Amazing experience!",
      status: "Pending",
    },
    {
      id: "R002",
      user: "Jane Smith",
      destination: "Bali",
      rating: 4,
      comment: "Beautiful place, but crowded.",
      status: "Approved",
    },
    {
      id: "R003",
      user: "Alice Johnson",
      destination: "Tokyo",
      rating: 3,
      comment: "Average experience.",
      status: "Pending",
    },
  ]);

  const statusStyle = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <DashboardLayout>
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Reviews Management</h2>

      {/* Reviews Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full text-left border-collapse">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-gray-500 font-medium">User</th>
              <th className="p-3 text-gray-500 font-medium">Destination</th>
              <th className="p-3 text-gray-500 font-medium">Rating</th>
              <th className="p-3 text-gray-500 font-medium">Comment</th>
              <th className="p-3 text-gray-500 font-medium">Status</th>
              <th className="p-3 text-gray-500 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={review.id} className="border-t">
                <td className="p-3">{review.user}</td>
                <td className="p-3">{review.destination}</td>
                <td className="p-3">{review.rating} ⭐</td>
                <td className="p-3">{review.comment}</td>
                <td className={`p-2 px-3 rounded-full text-sm font-medium w-max ${statusStyle(review.status)}`}>
                  {review.status}
                </td>
                <td className="p-3 flex gap-2">
                  {review.status === "Pending" && (
                    <button className="text-green-500 hover:underline">Approve</button>
                  )}
                  <button className="text-red-500 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

export default Reviews;
