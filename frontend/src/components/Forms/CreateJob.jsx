import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

function CreateJob() {

    const navigate = useNavigate();

    const BASE_URL = 'https://jop-portal-8yaz.onrender.com/api'

    const [formData, setFormData] = useState({
        title: "",
        skill: "",
        experience: "",
        location: "",
        maxCTC: "",
        noticePeriod: "",
        providerId: localStorage.getItem("currentProvider")
      });

      const handleChange = (e) =>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
      }

      const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    toast.loading("Loading...");
    const response = await axios.post(BASE_URL + '/jobs/create', formData);
    toast.success("Job Created Successfully");

    setFormData({
      title: "",
      skill: "",
      experience: "",
      location: "",
      maxCTC: "",
      noticePeriod: "",
      providerId: localStorage.getItem("currentProvider"),
    });

    navigate('/job-provider/jobs');
  } catch (error) {
    toast.error("Can Not Create Job");
    console.error("Error submitting form", error);
  }
};


  return (
    <div className="w-screen h-screen flex items-center justify-center bg-zinc-900 text-white p-6">
      <div className="w-full max-w-2xl bg-zinc-800 p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-indigo-400 mb-6">
          Creating A Job
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <input
              type="text"
              name="title"
              placeholder="Enter Job Title"
              value={formData.title}
              onChange={handleChange}
              className="w-1/2 p-3 bg-zinc-700 text-white rounded-lg outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
            <input
              type="text"
              name="skill"
              placeholder="Enter Required Skills"
              value={formData.skill}
              onChange={handleChange}
              className="w-1/2 p-3 bg-zinc-700 text-white rounded-lg outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

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
            name="maxCTC"
            placeholder="max CTC (in LPA)"
            value={formData.maxCTC}
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
  )
}

export default CreateJob
