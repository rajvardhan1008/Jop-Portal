import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

function ProviderProfile() {

  const BASE_URL = 'https://jop-portal-8yaz.onrender.com/api';
  const [providerData, setProviderData] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const getProviderById = async () => {
      try {
        const loadingToast = toast.loading("Loading...");
        const currentProvider = localStorage.getItem("currentProvider");
        const response = await axios.get(BASE_URL + `/job-provider/profile/${currentProvider}`);
        console.log(response.data.user);
        setProviderData(response.data.user || {}); // Ensure it's an object

        toast.dismiss(loadingToast);
        if (response.status !== 200) {
          toast.error("Unable to Fetch Provider");
          return;
        }
        toast.success("Provider Fetched Successfully");
      } catch (err) {
        toast.error("Error While Fetching Provider");
        console.log("Error in fetching provider", err);
      }
    };
    getProviderById();
  }, []);

  async function handleEdit() {
    try {
      const currentProvider = localStorage.getItem("currentProvider");
      const toastId = toast.loading("Updating...");
      const response = await axios.put(`${BASE_URL}/job-provider/update/${currentProvider}`, providerData);

      toast.dismiss(toastId);

      if (response.status !== 200) {
        toast.error("Unable To Update Provider");
        return;
      }

      toast.success("Provider Updated Successfully");
    } catch (err) {
      toast.dismiss();
      toast.error("Unable to Update Provider");
      console.log("Error while updating provider", err);
    }
  }


  return (
    <div className='w-full min-h-screen bg-zinc-900 text-white'>
      <h1 className='text-center text-4xl pt-4 font-semibold'>Your Profile</h1>
      <div className='flex flex-col justify-center items-center gap-4 pt-8'>

        <div className='flex flex-col gap-1'>
          <label htmlFor="firstName" className='text-xl'>First Name: </label>
          <input type="text"
            id='firstName'
            value={providerData.firstName || ""}
            onChange={(e) => setProviderData({ ...providerData, firstName: e.target.value })}
            className='bg-[#489c96] px-2 py-2 rounded-md text-xl focus:border-none' />
        </div>

        <div className='flex flex-col gap-1'>
          <label htmlFor="lastName" className='text-xl'>Last Name: </label>
          <input type="text"
            id='lastName'
            value={providerData.lastName || ""}
            onChange={(e) => setProviderData({ ...providerData, lastName: e.target.value })}
            className='bg-[#489c96] px-2 py-2 rounded-md text-xl focus:border-none' />
        </div>

        <div className='flex flex-col gap-1'>
          <label htmlFor="company" className='text-xl'>Company: </label>
          <input type="text"
            id='company'
            value={providerData.company || ""}
            onChange={(e) => setProviderData({ ...providerData, company: e.target.value })}
            className='bg-[#489c96] px-2 py-2 rounded-md text-xl focus:border-none' />
        </div>

        <div className='flex flex-col gap-1'>
          <label htmlFor="email" className='text-xl'>Email: </label>
          <input type="text"
            id='email'
            value={providerData.email || ""}
            onChange={(e) => setProviderData({ ...providerData, email: e.target.value })}
            className='bg-[#489c96] px-2 py-2 rounded-md text-xl focus:border-none' />
        </div>

        <div className='flex flex-col gap-1'>
          <label htmlFor="mobile" className='text-xl'>Mobile: </label>
          <input type="text"
            id='mobile'
            value={providerData.mobile || ""}
            onChange={(e) => setProviderData({ ...providerData, mobile: e.target.value })}
            className='bg-[#489c96] px-2 py-2 rounded-md text-xl focus:border-none' />
        </div>

        <button className='bg-green-700 w-[250px] py-2 mt-4 font-semibold rounded-md text-xl' onClick={handleEdit}>
          Save Changes
        </button>

      </div>
      <ToastContainer />
    </div>
  )
}

export default ProviderProfile
