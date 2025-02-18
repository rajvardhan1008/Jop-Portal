import React, { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AllJobs = () => {
  const [alljobs, setAlljobs] = useState([]);

  const BASE_URL = 'https://jop-portal-8yaz.onrender.com/api'
  const navigate = useNavigate();

  useEffect(() => {
    const getAllJobs = async () => {
      try {
        toast.loading("Loading...");
        const response = await axios.get(BASE_URL + '/jobs/all');
        console.log(response.data.jobs); // Debugging API response
        setAlljobs(response.data.jobs); // Assuming response.data is an array
        toast.success("All Jobs Fetched Successfully");
      } catch (error) {
        console.error("Error fetching jobs:", error);
        toast.error("Unable to Fetch Jobs");
      }
    };

    getAllJobs();
  }, []); // Runs only once when the component mounts


  async function handleApply(jobId) {
    try {
        const currentSeeker = localStorage.getItem("currentSeeker");

        if (!currentSeeker) {
            toast.error("No seeker found! Please log in.");
            return;
        }

        const response = await axios.get( BASE_URL +  `/job-seeker/applyforjob/${currentSeeker}/${jobId}`);

        if (!response || !response.data.success) {
            toast.error("Seeker Not Found");
            return;
        }

        toast.success("Application Successful!");

    } catch (error) {
          console.error("Error applying for job:", error);
          toast.error("Unable to Apply");
      }
  }



  return (
    <div className="bg-zinc-900 w-full text-white p-6 relative">
      <h2 className="text-3xl font-bold mb-4 text-center">All Jobs</h2>

      <div className="bg-green-700 px-4 py-2 absolute rounded-lg left-[90%] cursor-pointer top-4 font-semibold"
      onClick ={()=> navigate('/')}
      >
        Log Out
      </div>
      
      {alljobs.length > 0 ? (
        <div className="space-y-8 flex flex-col items-center justify-center">
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

              <button className="bg-green-700 w-full py-2 rounded-md hover:bg-green-500 text-lg font-semibold" onClick={() => handleApply(job._id)}>Apply</button>
            </div>
          ))}
        </div>
      ) : (
        <p>No Job Found</p>
      )}
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default AllJobs;
