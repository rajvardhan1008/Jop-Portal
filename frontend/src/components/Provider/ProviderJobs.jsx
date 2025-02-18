import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';

function ProviderJobs() {

    const [allJobs, setAllJobs] = useState();
    
    const BASE_URL = 'https://jop-portal-8yaz.onrender.com/api'

    useEffect(()=>{
        const getProviderJobs = async () => {
            try{
                const currentProvider = localStorage.getItem("currentProvider");
                toast.loading("Loading");
                const response = await axios.get(BASE_URL + `/job-provider/jobs/${currentProvider}`);
                toast.dismiss();

                console.log(response.data.data);

                setAllJobs(response.data.data);

                if(response.status != 200){
                    toast.error("Provider Not Found");
                    return;
                }

                toast.success("Provider Jobs fetched successfully");
            } catch(err){
                console.log("Error while fetchig jobs");
                toast.error("Unable to Fetch Provider Jobs");
            }
        }
        getProviderJobs();
    },[])

    async function handleDelete(jobId) {
        try{
            const loadingToast = toast.loading("Loading...");
            const response = await axios.delete( BASE_URL +  `/jobs/delete/${jobId}`)
            if(response.status != 200){
                toast.error("Unable to Delete Job");
                return;
            }
            toast.dismiss(loadingToast);
            toast.success("Job deleted Successfully");
            setAllJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
        } catch(err){
            toast.dismiss();
            toast.error("Error while Deleting Job");
            console.log(err.message);
        }
    }

  return (
    <div className='bg-slate-800 w-full h-screen flex justify-center items-center text-white text-xl'>
        {
            allJobs && allJobs.length > 0 ? (
                <div className="space-y-8 flex flex-col items-center justify-center">
          {allJobs.map((job) => (
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

              <button className="bg-green-700 w-full py-2 rounded-md hover:bg-green-500 text-lg font-semibold" onClick={() => handleDelete(job._id)}>Delete</button>
            </div>
          ))}
        </div>
            ):(
                <p>No Job is Created by Provider</p>
            )
        }
        <ToastContainer />
    </div>
  )
}

export default ProviderJobs
