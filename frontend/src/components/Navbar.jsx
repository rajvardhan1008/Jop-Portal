import React from 'react'
import { useNavigate } from 'react-router-dom'

function Navbar() {

    const navigate = useNavigate();

  return (
    <div className="w-full py-4 bg-blue-950 flex px-8 justify-between">
        <div className="text-2xl font-semibold pl-8 cursor-pointer" onClick={()=> navigate('/')}>
            <h1>Job Portal</h1>
        </div>

        <div className="flex gap-4 text-lg">
            <p className="cursor-pointer" onClick={()=> navigate('/')}>Home</p>
            <p className="cursor-pointer" onClick={()=> navigate('/job-seeker/home')}>Seeker</p>
            <p className="cursor-pointer" onClick={()=> navigate('/job-provider/home')}>Provider</p>
        </div>

    </div>
  )
}

export default Navbar
