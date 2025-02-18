import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

function SeekerProfile() {

  const BASE_URL = 'https://jop-portal-8yaz.onrender.com/api';

  const [seekerData, setSeekerData] = useState([]);

  const navigate = useNavigate();

  useEffect(()=>{
    const getSeekerById = async () =>{
        try{
            const loadingToast = toast.loading("Loading...");
            const currentSeeker = localStorage.getItem("currentSeeker");
            const response = await axios.get(BASE_URL + `/job-seeker/get-seeker/${currentSeeker}`);
            console.log(response.data.user);
            setSeekerData(response.data.user);

            toast.dismiss(loadingToast);
            if(!response.status == 200){
                toast.error("Unable to Fetch Seeker");
                return;
            }

            toast.success("Seeker Fetched Successfully");
        } catch(err){
            toast.error("Error While Fetching Seeker");
            console.log("Error in fetching seeker", err);
        }
    }
    getSeekerById();
  },[])

  return (
    <div className='w-full min-h-screen bg-zinc-900 text-white'>
        <h1 className='text-center text-4xl pt-4 font-semibold'>Current Profile</h1>
        <div className='flex flex-col justify-center items-center gap-4 pt-8'>
            <div className='border border-blue-600 w-[250px] py-2 text-center text-xl rounded-md'>
                First Name : {seekerData.firstName}
            </div>
            <div className='border border-blue-600 w-[250px] py-2 text-center text-xl rounded-md'>
                Last Name : {seekerData.lastName}
            </div>
            <div className='border border-blue-600 w-[250px] py-2 text-center text-xl rounded-md'>
                Experience : {seekerData.experience}
            </div>
            <div className='border border-blue-600 w-[250px] py-2 text-center text-xl rounded-md'>
                Location : {seekerData.location}
            </div>
            <div className='border border-blue-600 w-[250px] py-2 text-center text-xl rounded-md'>
                Notice Period : {seekerData.noticePeriod}
            </div>
            <button className='bg-green-700 w-[250px] py-2 font-semibold rounded-md'
                onClick={navigate('/job-seeker/profile/edit')}>
                Edit Profile
            </button>
        </div>
        <ToastContainer></ToastContainer>
    </div>
  )
}

export default SeekerProfile
