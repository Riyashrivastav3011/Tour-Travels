// src/pages/Destinations.jsx
import React, { useEffect, useState } from "react";
import DashboardLayout from './Dashboardlayout';
import axios from 'axios'
import Swal from "sweetalert2";
import { PackageMinus } from 'lucide-react';
import { Tickets } from 'lucide-react';


const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [id , setId] = useState("");
   const [form , setForm] = useState({
     name:"",
     description:"",
     image:"",
     hotel:"",
     resort:"",
     nearPlaces:"",
     location:""
  });

  useEffect(() =>{
    showPlaces();
  } , [])
   
  const showPlaces = async () =>{
    const res = await axios.get('http://localhost:5000/destinations/place');
    setDestinations(res.data);
  }
  
  
  const addPlace = async (e) =>{
    e.preventDefault();
   try{
      const data = new FormData();
    data.append("name" , form.name)
    data.append("description" , form.description)
    data.append("hotel" , form.hotel)
    data.append("resort" , form.resort)
    data.append("nearPlaces" , form.nearPlaces)
    data.append("location" , form.location)
    if(form.file){
      data.append("image" , form.file);
    }
    if(id){
      await axios.put(`http://localhost:5000/destinations/place/${id}` , data);
      Swal.fire({
       title: "Success!",
       text: "Place updated",
       icon: "success",
       confirmButtonText: "OK"
      });

    }else{
      await axios.post('http://localhost:5000/destinations/place' , data , {
        headers:{"Content-type" :"multipart/form-data"}
      })
       Swal.fire({
       title: "Success!",
       text: "Place added",
       icon: "Success",
       confirmButtonText: "OK"
      });
    }
    showPlaces();
    setId(null);
    setForm({ name: "", description: "", file: null , hotel:"", resort:"", nearPlaces:"" , location:"" });
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
  }

  const editPlace = async (plc) =>{
    setId(plc._id);
    setForm({
      name:plc.name,
      description:plc.description,
      image:null,
      hotel:plc.hotel,
      resort:plc.resort,
      nearPlaces:plc.nearPlaces,
      location:plc.location
    })
      window.scrollTo({ top: 0, behavior: "smooth" });

  }

  const deletePlace = (id) =>{
   axios.delete(`http://localhost:5000/destinations/place/${id}` )
   setDestinations(destinations.filter(des => des.id !== id));
   showPlaces();
  }

  return (
    <DashboardLayout>
        <h2 className="text-xl text-center py-5 font-semibold text-gray-700">Add Destinations</h2>
      <div className="flex justify-between items-center mb-6">
        <form className="grid gap-4 mx-auto" onSubmit={addPlace}>
              <input
              type="text"
                name="name"
                placeholder="Place Name"
                value={form.name}
                onChange={(e) =>{setForm({...form , name : e.target.value})}}
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

               <input
              type="text"
                name="hotel"
                placeholder="no of hotels"
                value={form.hotel}
                onChange={(e) =>{setForm({...form , hotel : e.target.value})}}
                className="p-2 border rounded-lg"
                required
              />

              <input
              type="text"
                name="resort"
                placeholder="no of resorts"
                value={form.resort}
                onChange={(e) =>{setForm({...form , resort : e.target.value})}}
                className="p-2 border rounded-lg"
                required
              /> 

               <input
              type="text"
                name="nearPlaces"
                placeholder="Nearest Places "
                value={form.nearPlaces}
                onChange={(e) =>{setForm({...form , nearPlaces : e.target.value})}}
                className="p-2 border rounded-lg"
                required
              />

              <input
              type="text"
                name="location"
                placeholder="map location"
                value={form.location}
                onChange={(e) =>{setForm({...form , location : e.target.value})}}
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

      {/* Destination Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {destinations.map((dest) => (
          <div
            key={dest.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img  src={`http://localhost:5000/uploads/${dest.image}`}  alt={dest.name} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h3 className="text-gray-700 font-semibold text-lg">{dest.name}</h3>
              <p className="text-gray-500 text-sm">{dest.description}</p>
              <p className="text-gray-500 text-sm">Hotels : {dest.hotel}</p>
              <p className="text-gray-500 text-sm">Resorts : {dest.resort}</p>
              <p className="text-gray-500 text-sm">Neares Places : {dest.nearPlaces}</p>
              <p className="text-gray-500 text-sm">Location : {dest.location}</p>
              <div className="mt-4 flex gap-2">
                <button
               onClick={() => editPlace(dest)}
               className="px-3 py-1 text-sky-500  rounded-lg"
             >
               <Tickets />Edit
              </button>
              <button
                onClick={() => deletePlace(dest._id)}
                 className="px-3 py-1 text-red-600 rounded-lg"
               >
                 <PackageMinus />Delete
               </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Destinations;
