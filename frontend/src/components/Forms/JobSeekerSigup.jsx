import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const JobSeekerForm = () => {

  const BASE_URL = 'https://jop-portal-8yaz.onrender.com/api'

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password:"",
    skills: "",
    experience: "",
    location: "",
    currentCTC: "",
    noticePeriod: "",
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
      const toastLoading = toast.loading("Loading...");
      const response = await axios.post(BASE_URL + '/job-seeker/signup',
        formData
      );
      toast.dismiss(toastLoading);
      console.log(response.data.seeker._id);
      toast.success("Job Seeker Signup Success");

      // Clear input fields after successful submission
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        skills: "",
        experience: "",
        location: "",
        currentCTC: "",
        noticePeriod: "",
      });

      localStorage.setItem("currentSeeker", response.data.seeker._id)

      navigate('/job-seeker/alljobs')

    } catch (error) {
      console.error("Error submitting form", error);
      toast.dismiss();
      toast.error("Signup failed! Please try again.");
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-zinc-900 text-white p-6">
      <div className="w-full max-w-2xl bg-zinc-800 p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-indigo-400 mb-6">
          Job Seeker Form
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
            type="email"
            name="email"
            placeholder="Enter Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 bg-zinc-700 text-white rounded-lg outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Your Neumeric Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 bg-zinc-700 text-white rounded-lg outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />

          <input
            type="text"
            name="skills"
            placeholder="Skills (e.g., React, Node.js)"
            value={formData.skills}
            onChange={handleChange}
            className="w-full p-3 bg-zinc-700 text-white rounded-lg outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />

          <input
            type="text"
            name="experience"
            placeholder="Experience (in years)"
            value={formData.experience}
            onChange={handleChange}
            className="w-full p-3 bg-zinc-700 text-white rounded-lg outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-3 bg-zinc-700 text-white rounded-lg outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />

          <input
            type="text"
            name="currentCTC"
            placeholder="Current CTC (in LPA)"
            value={formData.currentCTC}
            onChange={handleChange}
            className="w-full p-3 bg-zinc-700 text-white rounded-lg outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />

          <input
            type="text"
            name="noticePeriod"
            placeholder="Notice Period (in days)"
            value={formData.noticePeriod}
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

export default JobSeekerForm;
