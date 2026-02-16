import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";

function Register({ setIsLogin }) {

  const [Form, setForm] = useState({
    fname: "",
    lname: "",
    name: "",
    email: "",
    mobile: "",
    address: "",
    password: ""
  });

  const navigate = useNavigate();

  // update fname / lname and combine into name
  const handleName = (e) => {
    const { name, value } = e.target;

    setForm(prev => {
      const updated = { ...prev, [name]: value };
      updated.name = `${updated.fname} ${updated.lname}`.trim();
      return updated;
    });
  };

  const handleChange = (event) => {
    setForm({ ...Form, [event.target.name]: event.target.value });
  };

  const Submit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/api/register', Form);

      Swal.fire({
        title: "Success!",
        text: "Your account has been created successfully.",
        icon: "success"
      });

      setIsLogin && setIsLogin(true);
      navigate('/login');

    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: err.response?.data?.message || "Something went wrong!",
        icon: "error"
      });
    }
  };

  return (
    <>
      <form onSubmit={Submit}>
        <div>
          <div className="border-b border-gray-900/10 pb-4"></div>

          <div className="border-b border-gray-900/10 p-8">

            <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6">

              {/* First name */}
              <div className="sm:col-span-3">
                <label className="block text-sm/6 font-medium text-gray-900">First name</label>
                <input
                  id="fname"
                  name="fname"
                  onChange={handleName}
                  value={Form.fname}
                  type="text"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300"
                />
              </div>

              {/* Last name */}
              <div className="sm:col-span-3">
                <label className="block text-sm/6 font-medium text-gray-900">Last name</label>
                <input
                  id="lname"
                  name="lname"
                  onChange={handleName}
                  value={Form.lname}
                  type="text"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300"
                />
              </div>

              {/* Mobile */}
              <div className="sm:col-span-3">
                <label className="block text-sm/6 font-medium text-gray-900">Mobile no</label>
                <input
                  id="mobile"
                  name="mobile"
                  onChange={handleChange}
                  value={Form.mobile}
                  type="text"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300"
                />
              </div>

              {/* Email */}
              <div className="sm:col-span-4">
                <label className="block text-sm/6 font-medium text-gray-900">Email</label>
                <input
                  id="email"
                  name="email"
                  onChange={handleChange}
                  value={Form.email}
                  type="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300"
                />
              </div>

              {/* Address */}
              <div className="sm:col-span-6">
                <label className="block text-sm/6 font-medium text-gray-900">Address</label>
                <input
                  id="address"
                  name="address"
                  onChange={handleChange}
                  value={Form.address}
                  type="text"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300"
                />
              </div>

              {/* Password (moved correctly, not under country) */}
              <div className="sm:col-span-3">
                <label className="block text-sm/6 font-medium text-gray-900">Password</label>
                <input
                  id="password"
                  name="password"
                  onChange={handleChange}
                  value={Form.password}
                  type="password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300"
                />
              </div>

            </div>
          </div>
        </div>

        <div className="mt-3 text-center">
          <p>Already have an account? <a href="/login" className="font-semibold text-gray-900">Login</a></p>

          <button
            type="submit"
            className="mt-4 rounded-md bg-indigo-600 px-10 py-3 text-sm font-semibold text-white"
          >
            Signup
          </button>
        </div>
      </form>
    </>
  );
}

export default Register;
