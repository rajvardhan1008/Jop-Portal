import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';

function History() {

    const BASE_URL = 'https://jop-portal-8yaz.onrender.com/api';
    const [alljobs, setAlljobs] = useState([]);
    useEffect(() => {
        const getSeekerHistory = async () => {
            try {
                const currentSeeker = localStorage.getItem("currentSeeker");
                if (!currentSeeker) {
                    toast.error("No seeker found in local storage");
                    return;
                }
    
                const loadingToast = toast.loading("Loading..."); // Store loading toast ID
    
                const response = await axios.get(BASE_URL + `/job-seeker/applied-jobs/${currentSeeker}`);
                
                toast.dismiss(loadingToast); // Remove loading toast
                toast.success("History Fetched Successfully");
    
                setAlljobs(response.data.appliedJobs);
            } catch (err) {
                toast.dismiss(); // Ensure loader is dismissed on error
                toast.error("Error while Fetching History");
                console.error("Error in fetching seeker's history", err);
            }
        };
    
        getSeekerHistory();
    }, []);
    

  return (
    <div className="bg-zinc-900 w-full text-white p-6 relative max-h-full">
      <h2 className="text-3xl font-bold mb-4 text-center">All Jobs Applied by You</h2>

      <div className="flex gap-4 absolute top-4 left-[85%]">
        <div className="bg-green-700 px-4 py-2 rounded-lg cursor-pointer font-semibold"
        onClick ={()=> navigate('/')}
        >
          Log Out
        </div>
      </div>
      
      {alljobs.length > 0 ? (
        <div className="space-y-8 flex flex-col items-center justify-center min-h-screen">
          {alljobs.map((job) => (
            <div key={job._id} className="p-4 bg-zinc-800 rounded-lg shadow-md w-[500px] flex flex-col items-center justify-center gap-2">
              <h3 className="text-xl font-semibold bg-indigo-800 rounded-lg py-2 w-full text-center">{job.title}</h3>

              {
                <div className="flex flex-wrap justify-center gap-8">
                  Skills : {job.skill}
              </div>
              }

              <p className="text-sm w-full bg-[#3e3f6c] text-center py-2">Experience: {job.experience} Years</p>

              <p className="text-md w-full text-center py-2">Location : {job.location}</p>

              <p className="text-sm w-full bg-[#3e3f6c] text-center py-2">MaxCTC: {job.maxCTC} LPA</p>

              <p className="text-sm w-full text-center py-2">Notice Period: {job.noticePeriod} Days</p>

            </div>
          ))}
        </div>
      ) : (
        <p>No Job Found</p>
      )}
      <ToastContainer></ToastContainer>
    </div>
  )
}

export default History
