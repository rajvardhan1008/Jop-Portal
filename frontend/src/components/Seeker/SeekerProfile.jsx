import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

function SeekerProfile() {

  const BASE_URL = 'https://jop-portal-8yaz.onrender.com/api';
  const [seekerData, setSeekerData] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const getSeekerById = async () => {
      try {
        const loadingToast = toast.loading("Loading...");
        const currentSeeker = localStorage.getItem("currentSeeker");
        const response = await axios.get(`${BASE_URL}/job-seeker/get-seeker/${currentSeeker}`);
        console.log(response.data.user);
        setSeekerData(response.data.user || {}); // Ensure it's an object

        toast.dismiss(loadingToast);
        if (response.status !== 200) {
          toast.error("Unable to Fetch Seeker");
          return;
        }
        toast.success("Seeker Fetched Successfully");
      } catch (err) {
        toast.error("Error While Fetching Seeker");
        console.log("Error in fetching seeker", err);
      }
    };
    getSeekerById();
  }, []);

  async function handleEdit() {
    try {
      const currentSeeker = localStorage.getItem("currentSeeker");
      const toastId = toast.loading("Updating...");
      const response = await axios.put(`${BASE_URL}/job-seeker/update/${currentSeeker}`, seekerData);
      toast.dismiss(toastId);
      if (response.status !== 200) {
        toast.error("Unable To Update Seeker");
        return;
      }
      toast.success("Seeker Updated Successfully");
    } catch (err) {
      toast.dismiss();
      toast.error("Unable to Update Seeker");
      console.log("Error while updating seeker", err);
    }
  }

  return (
    <div className='w-full min-h-screen bg-zinc-900 text-white'>
      <h1 className='text-center text-4xl pt-4 font-semibold'>Current Profile</h1>
      <div className='flex flex-col justify-center items-center gap-4 pt-8'>

        <div className='flex flex-col gap-1'>
          <label htmlFor="firstName" className='text-xl'>First Name: </label>
          <input type="text"
            id='firstName'
            value={seekerData.firstName || ""}
            onChange={(e) => setSeekerData({ ...seekerData, firstName: e.target.value })}
            className='bg-[#489c96] px-2 py-2 rounded-md text-xl focus:border-none' />
        </div>

        <div className='flex flex-col gap-1'>
          <label htmlFor="lastName" className='text-xl'>Last Name: </label>
          <input type="text"
            id='lastName'
            value={seekerData.lastName || ""}
            onChange={(e) => setSeekerData({ ...seekerData, lastName: e.target.value })}
            className='bg-[#489c96] px-2 py-2 rounded-md text-xl focus:border-none' />
        </div>

        <div className='flex flex-col gap-1'>
          <label htmlFor="experience" className='text-xl'>Experience: (years) </label>
          <input type="number"
            id='experience'
            value={seekerData.experience || ""}
            onChange={(e) => setSeekerData({ ...seekerData, experience: e.target.value })}
            className='bg-[#489c96] px-2 py-2 rounded-md text-xl focus:border-none' />
        </div>

        <div className='flex flex-col gap-1'>
          <label htmlFor="location" className='text-xl'>Location: </label>
          <input type="text"
            id='location'
            value={seekerData.location || ""}
            onChange={(e) => setSeekerData({ ...seekerData, location: e.target.value })}
            className='bg-[#489c96] px-2 py-2 rounded-md text-xl focus:border-none' />
        </div>

        <div className='flex flex-col gap-1'>
          <label htmlFor="noticePeriod" className='text-xl'>Notice Period: (days)</label>
          <input type="number"
            id='noticePeriod'
            value={seekerData.noticePeriod || ""}
            onChange={(e) => setSeekerData({ ...seekerData, noticePeriod: e.target.value })}
            className='bg-[#489c96] px-2 py-2 rounded-md text-xl focus:border-none' />
        </div>

        <div className='flex flex-col gap-1'>
          <label htmlFor="ctc" className='text-xl'>Current CTC: (LPA)</label>
          <input type="number"
            id='ctc'
            value={seekerData.currentCTC || ""}
            onChange={(e) => setSeekerData({ ...seekerData, currentCTC: e.target.value })}
            className='bg-[#489c96] px-2 py-2 rounded-md text-xl focus:border-none' />
        </div>


        <button className='bg-green-700 w-[250px] py-2 mt-4 font-semibold rounded-md text-xl' onClick={handleEdit}>
          Save Changes
        </button>

      </div>
      <ToastContainer />
    </div>
  );
}

export default SeekerProfile;
