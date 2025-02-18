import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const JobProviderSignup = () => {

  const BASE_URL = "https://jop-portal-8yaz.onrender.com/api"

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    mobile: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("data", formData);
      const response = await axios.post(
        BASE_URL + '/job-provider/signup',
        formData
      );
      console.log("After respoonse",response);
      toast.success("Job Provider Signup Success");
      
      // Clear input fields after successful submission
      setFormData({
        firstName: "",
        lastName: "",
        company: "",
        email: "",
        mobile: "",
      });

      localStorage.setItem("currentProvider", response.data.provider._id);

      navigate('/job-seeker/allseekers');

    } catch (error) {
      console.error("Error submitting form", error);
      toast.error("Signup failed! Please try again.");
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-zinc-900 text-white p-6">
      <div className="w-full max-w-2xl bg-zinc-800 p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-indigo-400 mb-6">
          Job Provider Form
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="w-1/2 p-3 bg-zinc-700 text-white rounded-lg outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="w-1/2 p-3 bg-zinc-700 text-white rounded-lg outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          <input
            type="text"
            name="company"
            placeholder="Enter Your Company's Name"
            value={formData.company}
            onChange={handleChange}
            className="w-full p-3 bg-zinc-700 text-white rounded-lg outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Enter Your Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 bg-zinc-700 text-white rounded-lg outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />

          <input
            type="text"
            name="mobile"
            placeholder="Mobile"
            value={formData.mobile}
            onChange={handleChange}
            className="w-full p-3 bg-zinc-700 text-white rounded-lg outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-lg shadow-md transition-all duration-300"
          >
            Submit
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default JobProviderSignup;
