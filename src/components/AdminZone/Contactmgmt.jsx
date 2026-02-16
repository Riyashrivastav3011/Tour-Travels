import { useEffect, useState } from "react";
import Dashboardlayout from './Dashboardlayout'
import axios from 'axios'

function Contactmgmt() {
  const [queries , setQuery] = useState([]);
  
  useEffect(() => {
    axios.get('http://localhost:5000/admin/query')
    .then((res) =>{
      setQuery(res.data.queries)
    })
    .catch((err)=>console.error(err))
   } , [])
   
   const handleUpdate = (id , newStatus) =>{
    axios.put(`http://localhost:5000/admin/query/${id}` , {status : newStatus})
    .then(() =>{
    setQuery(prev =>
      prev.map(q =>
        q._id === id ? {...q , status:newStatus}:q
      )
    )
    })  
    .catch(err => console.error(err));
   }


  const getStatus = (status) =>{
   switch (status) {
      case "yes":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "No":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  }
  return (
    <Dashboardlayout>
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Contact Management</h2>
       <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full text-left border-collapse">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-gray-500 font-medium">Contact Id</th>
              <th className="p-3 text-gray-500 font-medium">Name</th>
              <th className="p-3 text-gray-500 font-medium">Email</th>
              <th className="p-3 text-gray-500 font-medium">Mobile</th>
              <th className="p-3 text-gray-500 font-medium">Message</th>
              <th className="p-3 text-gray-500 font-medium">Status</th>
                          </tr>
          </thead>
          <tbody> 
            {queries.map((e) => (
              <tr key={e._id} className="border-t">
                <td className="p-3">{e._id}</td>
                <td className="p-3">{e.name}</td>
                <td className="p-3">{e.email}</td>
                <td className="p-3">{e.mobile}</td>
                <td className="p-3">{e.message}</td>
                <td className={`p-2 px-3 rounded-full text-sm font-medium w-max ${getStatus(e.status)}`}>
                <select
                   className="bg-transparent border-none outline-none cursor-pointer"
                   value={e.status}
                   onChange={(ev) => handleUpdate(e._id , ev.target.value)}
                >
                  <option value="pending">pending</option>
                  <option value="yes">yes</option>
                  <option value="No">No</option>
                </select>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>   
    </Dashboardlayout>
  )
}

export default Contactmgmt