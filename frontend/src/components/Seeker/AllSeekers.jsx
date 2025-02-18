import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AllSeekers = () => {
  const [allSeekers, setAllSeekers] = useState([]);

   const BASE_URL = 'https://jop-portal-8yaz.onrender.com/api'

  const navigate = useNavigate();

  useEffect(() => {
    const getAllSeekers = async () => {
      try {
        const response = await axios.get(BASE_URL + '/job-seeker/getall');
        console.log(response.data); // Debugging API response
        setAllSeekers(response.data.allSeekers); // Assuming response.data is an array
      } catch (error) {
        console.error("Error fetching job seekers:", error);
      }
    };

    getAllSeekers();
  }, []); // Runs only once when the component mounts

  return (
    <div className="bg-zinc-900 w-full text-white p-6 relative">
      <h2 className="text-3xl font-bold mb-4 text-center">All Job Seekers</h2>

      <div className="flex  gap-4 absolute left-[75%] top-4">
        <button className="bg-green-700 hover:bg-green-600 px-4 py-1 font-semibold rounded-lg"
        onClick={() => navigate('/job-provider/createjob')}
        >Create A Job</button>
        <button className="bg-green-600 hover:bg-green-500 px-4 py-1 font-semibold rounded-lg"
        onClick = {() => navigate('/')}
        >Log Out</button>
        <button className="bg-green-700 hover:bg-green-600 px-4 py-1 font-semibold rounded-lg"
        onClick={() => navigate('/job-provider/jobs')}
        >Your Jobs</button>
      </div>
      
      {allSeekers.length > 0 ? (
        <div className="space-y-4 flex flex-col items-center justify-center">
          {allSeekers.map((seeker) => (
            <div 
              key={seeker._id} 
              className="p-4 bg-zinc-800 rounded-lg shadow-md w-[500px] flex flex-col items-center justify-center gap-2"
            >
              <h3 className="text-xl font-semibold bg-indigo-800 rounded-lg py-2 w-full text-center">
                {seeker.firstName} {seeker.lastName}
              </h3>
              
              {/* Display skills */}
              {seeker.skills && seeker.skills.length > 0 ? (
                <div className="flex flex-wrap justify-center gap-2">
                  {seeker.skills.map((skill, index) => (
                    <p key={index} className="bg-gray-700 px-2 text-sm py-1 rounded-md">
                      {skill}
                    </p>
                  ))}
                </div>
              ) : (
                <p>No skills listed</p>
              )}
              
              <p className="text-sm w-full bg-[#3e3f6c] text-center py-2">
                Location : {seeker.location}
              </p>

              <p className="text-sm w-full bg-[#3e3f6c] text-center py-2">
                Current CTC : {seeker.currentCTC} LPA
              </p>

              <p className="text-sm w-full bg-[#3e3f6c] text-center py-2">
                Experience : {seeker.experience} Years
              </p>

              <p className="text-sm w-full bg-[#3e3f6c] text-center py-2">
                Notice Period : {seeker.noticePeriod} days
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg">No Job Seeker Found</p>
      )}
    </div>
  );
};

export default AllSeekers;
