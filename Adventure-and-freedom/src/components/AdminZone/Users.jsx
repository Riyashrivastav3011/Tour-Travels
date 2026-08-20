import React, { useState , useEffect} from "react";
import DashboardLayout from "./Dashboardlayout";
import { AiTwotoneDelete } from "react-icons/ai";
import axios from 'axios'

const Users = () => {
  const [users , setUsers] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/users`)
      .then((res) =>{
        setUsers(res.data.users);
        console.log(res.data);
      })
      .catch(err => console.error(err));
  }, []);
  
  const handleDelete = (id) =>{
    axios.delete(`${import.meta.env.VITE_API_URL}/api/user/${id}`)
      .then(()=>{
        setUsers(users.filter(user => user._id !== id))
      })
  }

  return (
    <DashboardLayout>
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Users Management</h2>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full w-full table-fixed text-left border-collapse">

          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-gray-500 font-medium w-1/6">Name</th>
              <th className="p-3 text-gray-500 font-medium w-1/6">Email</th>
              <th className="p-3 text-gray-500 font-medium w-1/6">Mobile</th>
              <th className="p-3 text-gray-500 font-medium w-1/6">Address</th>
              <th className="p-3 text-gray-500 font-medium w-1/6">Password</th>
              <th className="p-3 text-gray-500 font-medium w-1/6">Delete</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t">
                <td className="p-3 truncate">{user.name}</td>
                <td className="p-3 truncate">{user.email}</td>
                <td className="p-3 truncate">{user.mobile}</td>
                <td className="p-3 truncate">{user.address}</td>
                <td className="p-3 truncate">{user.password}</td>
                <td className="p-3">
                  <button 
                  className='hover:text-red-500'
                  onClick={() => handleDelete(user._id)}>
                    <AiTwotoneDelete size={20}/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </DashboardLayout>
  );
};

export default Users;


