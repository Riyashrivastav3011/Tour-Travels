import React, { useState } from "react";
import bgImage from "../../images/back.avif";
import "../../App.css";
import Header from "./Header";
import Footer from "./Footer";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";


function LoginForm() {
    const [form , setform] = useState({
    email:'',
    password:''
   })
   const navigate = useNavigate();
   const handleChange = (e) =>{
    setform({...form , [e.target.name] : e.target.value});
   }
  const submit = async (e) =>{
   e.preventDefault();
   try{
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/login` , form ,{
      withCredentials:true
    });
     // store token
   localStorage.setItem('user', JSON.stringify(res.data.user));
    Swal.fire({
        title: "Success!",
        text: "Logged in",
        icon: "success",
        confirmButtonText: "OK"
      });
      navigate('/');
   }catch(err){
    Swal.fire({
      title: "Error!",
      text: err.response?.data?.message || "Something went wrong!",
      icon: "error",
      confirmButtonText: "Try Again"
    });
    console.log(err);
   }
  }


  return (
    <div className="backdrop-blur-md animate-fadeIn md:w-100 bg-white/10 border my-25 border-white/20 rounded-xl p-8 w-full shadow-lg">
      <h2 className="text-2xl font-semibold text-center text-white mb-7">Login</h2>

      <form className="space-y-5" onSubmit={submit}>
        <input
          type="text"
          name='email'
          onChange={handleChange}
          value={form.email}
          className="w-full px-4 py-2 rounded-lg bg-white/20 text-white"
          placeholder="Enter username or email"
        />

        <input
          type="password"
          name='password'
          onChange={handleChange}
          value={form.password}
          className="w-full px-4 py-2 rounded-lg bg-white/20 text-white"
          placeholder="Enter password"
        />

        <button type='submit' className="w-full py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white font-semibold">
          Login
        </button>
      </form>

      <p className="text-center text-sm text-white mt-6">
        Don't have an account?{" "}
        <a href="/member" className="text-indigo-300 hover:underline">
          Register
        </a>
      </p>
    </div>
  );
}


/* -------------------------------- MAIN PAGE -------------------------------- */
const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      <Header />

      <div
        className="min-h-fit flex items-center justify-around bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        {/* Render Login or Signup based on state */}
        {isLogin ? <LoginForm setIsLogin={setIsLogin} /> : <SignupForm setIsLogin={setIsLogin} />}

        {/* Right side static text */}
        <div className="backdrop-blur-md animate-fadeIn md:w-100 bg-white/10 border my-25 border-white/20 rounded-xl p-8 w-full shadow-lg">
          <p className="text-white text-3xl font-medium">
            "Adventure Awaits… Log in and Start Exploring!"
          </p>
          <ul className="list-none text-xl text-white">
            <li>Discover new destinations and hidden gems.</li>
            <li>Plan perfect trips with ease.</li>
            <li>Save your favourite experiences.</li>
            <li>Join a traveler community.</li>
          </ul>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default LoginPage;
