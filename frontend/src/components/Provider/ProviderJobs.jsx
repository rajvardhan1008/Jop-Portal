import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function ProviderJobs() {
  const [allJobs, setAllJobs] = useState([]);

  const BASE_URL = 'https://jop-portal-8yaz.onrender.com/api';

  useEffect(() => {
    const getProviderJobs = async () => {
      const toastId = toast.loading("Loading..."); // Show loading toast

      try {
        const currentProvider = localStorage.getItem("currentProvider");
        const response = await axios.get(BASE_URL + `/job-provider/jobs/${currentProvider}`);

        console.log(response.data.data);

        setAllJobs(response.data.data);

        if (response.status !== 200) {
          toast.update(toastId, { render: "Provider Not Found", type: "error", isLoading: false, autoClose: 3000 });
          return;
        }

        toast.update(toastId, { render: "Provider Jobs fetched successfully", type: "success", isLoading: false, autoClose: 3000 });
      } catch (err) {
        toast.update(toastId, { render: "Unable to Fetch Provider Jobs", type: "error", isLoading: false, autoClose: 3000 });
      }
    };

    getProviderJobs();
  }, []);

  async function handleDelete(jobId) {
    const toastId = toast.loading("Deleting..."); // Show loading toast for delete operation

    try {
      const response = await axios.delete(`http://localhost:4000/api/jobs/delete/${jobId}`);

      if (response.status !== 200) {
        toast.update(toastId, { render: "Unable to Delete Job", type: "error", isLoading: false, autoClose: 3000 });
        return;
      }

      toast.update(toastId, { render: "Job deleted successfully", type: "success", isLoading: false, autoClose: 3000 });
      setAllJobs(allJobs.filter((job) => job._id !== jobId)); // Remove the deleted job from the UI
    } catch (err) {
      toast.update(toastId, { render: "Error while Deleting Job", type: "error", isLoading: false, autoClose: 3000 });
      console.log(err.message);
    }
  }

  return (
    <div className='bg-slate-800 w-full h-screen flex justify-center items-center text-white text-xl'>
      {allJobs && allJobs.length > 0 ? (
        <div className="space-y-8 flex flex-col items-center justify-center">
          {allJobs.map((job) => (
            <div key={job._id} className="p-4 bg-zinc-800 rounded-lg shadow-md w-[500px] flex flex-col items-center justify-center gap-2">
              <h3 className="text-xl font-semibold bg-indigo-800 rounded-lg py-2 w-full text-center">{job.title}</h3>

              <div className="flex flex-wrap justify-center gap-8">
                Skills : {job.skill}
              </div>

              <p className="text-sm w-full bg-[#3e3f6c] text-center py-2">Experience: {job.experience} Years</p>
              <p className="text-md w-full text-center py-2">Location : {job.location}</p>
              <p className="text-sm w-full bg-[#3e3f6c] text-center py-2">MaxCTC: {job.maxCTC} LPA</p>
              <p className="text-sm w-full text-center py-2">Notice Period: {job.noticePeriod} Days</p>

              <button
                className="bg-green-700 w-full py-2 rounded-md hover:bg-green-500 text-lg font-semibold"
                onClick={() => handleDelete(job._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No Job is Created by Provider</p>
      )}
    </div>
  );
}

export default ProviderJobs;
