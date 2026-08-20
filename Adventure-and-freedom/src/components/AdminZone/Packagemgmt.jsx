import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Dashboardlayout from "./Dashboardlayout";
import { PackageMinus } from 'lucide-react';
import { Tickets } from 'lucide-react';
import axios from 'axios'
import Swal from "sweetalert2";


function Packagemgmt() {
  const [packages, setPackages] = useState([]);
  const [pkgid, setPkgid] = useState(null);
  const [form, setForm] = useState({
    name: "",
    price: "",
    duration: "",
    description: "",
    image: "",
  });

  useEffect(() =>{
    showPackages();
  }, [])
   
  const showPackages = async () =>{
   const res = await axios.get(`${import.meta.env.VITE_API_URL}/admin/package`)
   setPackages(res.data);
  }

  const handleAdd = async (e) => {
    e.preventDefault();
    try{
     const data = new FormData();
     data.append("name" , form.name);
     data.append("price" , form.price);
     data.append("duration" , form.duration);
     data.append("description" , form.description);
     if(form.file){
      data.append("image" , form.file);
     }
     if(pkgid){
      await axios.put(`${import.meta.env.VITE_API_URL}/admin/package/${pkgid}` , data)
       Swal.fire({
                   title: "Success!",
                   text: "Package updated",
                   icon: "success",
                   confirmButtonText: "OK"
                 });
    }
    else{
        await axios.post(`${import.meta.env.VITE_API_URL}/admin/package` , data , {
        headers: { "Content-Type": "multipart/form-data" }
      })
       Swal.fire({
                   title: "Success!",
                   text: "Thanks for Contact us",
                   icon: "Package added",
                   confirmButtonText: "OK"
                 });

    }
    showPackages();
    setPkgid(null);
    setForm({ name: "", price: "", duration: "", description: "", file: null });
    }
    catch(err){
         Swal.fire({
                  title: "Error!",
                  text: err.response?.data?.message || "Something went wrong!",
                  icon: "error",
                  confirmButtonText: "Try Again"
                });
                console.log(err);
  }
  };

  const handleEdit = async (pkg) =>{
   setPkgid(pkg._id);
    setForm({
    name: pkg.name,
    price: pkg.price,
    duration: pkg.duration,
    description: pkg.description,
    image: null,
  });
  }
  const handleDelete = (id) => {
    axios.delete(`${import.meta.env.VITE_API_URL}/admin/package/${id}`);
    setPackages(packages.filter((pkg) => pkg.id !== id));
     showPackages();
  };

  return (
    <Dashboardlayout>
      <div className="p-6 w-full mx-auto">
        <h1 className="text-3xl font-bold mb-6">Package Management</h1>

        {/* Add Package Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="p-5 bg-white shadow-lg rounded-2xl">
            <h2 className="text-xl font-semibold mb-4">Add New Package</h2>

            <form className="grid md:grid-cols-2 gap-4" onSubmit={handleAdd}>
              <input
              type="text"
                name="name"
                placeholder="Package Name"
                value={form.name}
                onChange={(e) =>{setForm({...form , name : e.target.value})}}
                className="p-2 border rounded-lg"
                required
              />

              <input
              type="text"
                name="price"
                placeholder="Price (₹)"
                value={form.price}
                onChange={(e) =>{setForm({...form , price : e.target.value})}}
                className="p-2 border rounded-lg"
                required
              />

              <input
              type="text"
                name="duration"
                placeholder="Duration (e.g., 3 Days / 2 Nights)"
                value={form.duration}
                onChange={(e) =>{setForm({...form , duration : e.target.value})}}
                className="p-2 border rounded-lg"
                required
              />

              <input
              type="file"
                name="image"
                placeholder="Image URL"
                onChange={(e) =>setForm({...form , file : e.target.files[0]})}
                className="p-2 border rounded-lg"
                required
              />

              <textarea
                name="description"
                placeholder="Package Description"
                value={form.description}
                onChange={(e) =>{setForm({...form , description : e.target.value})}}
                className="p-2 border rounded-lg md:col-span-2"
              />

              <button
                type="submit"
                className="md:col-span-2 p-3 bg-black text-white rounded-lg hover:bg-gray-800"
              >
                Add Package
              </button>
            </form>
          </div>
        </motion.div>

        {/* Package List */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="p-5 bg-white shadow-lg rounded-2xl">
            <h2 className="text-xl font-semibold mb-4">All Packages</h2>

            {packages.length === 0 ? (
              <p className="text-gray-500">No packages added yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b">
                      <th className="p-2">Name</th>
                      <th className="p-2">Price</th>
                      <th className="p-2">Duration</th>
                      <th className="p-2">description</th>
                      <th className="p-2">Image</th>
                      <th className="p-2">Delete</th>
                      <th className="p-2">Edit</th>
                    </tr>
                  </thead>

                  <tbody>
                    {packages.map((pkg) => (
                      <tr key={pkg.id} className="border-b">
                        <td className="p-2 font-medium">{pkg.name}</td>
                        <td className="p-2">₹{pkg.price}</td>
                        <td className="p-2">{pkg.duration}</td>
                        <td className="p-2">{pkg.description}</td>
                       <td className="p-2">
                          <img
                           src={`${import.meta.env.VITE_API_URL}/uploads/${pkg.image}`} 
                            alt=""
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                        </td>
                        <td className="p-2">
                          <button
                            onClick={() => handleDelete(pkg._id)}
                            className="px-3 py-1 text-gray-500 hover:text-red-600 rounded-lg"
                          >
                            <PackageMinus />
                          </button>
                        </td>
                       <td className="p-2">
                          <button
                            onClick={() => handleEdit(pkg)}
                            className="px-3 py-1 text-gray-500 hover:text-green-600  rounded-lg"
                          >
                           <Tickets />
                          </button>
                        </td>
                       
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </Dashboardlayout>
  );
}

export default Packagemgmt;
