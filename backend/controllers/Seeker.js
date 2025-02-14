const Seeker = require('../models/Seeker');
const Job = require("../models/Job");


exports.seekerSignup = async(req, res)=>{
    try{
        const {
            firstName, 
            lastName, 
            skills, 
            experience, 
            location,
            currentCTC,
            noticePeriod} = req.body;

        if(!firstName || !lastName || !skills || !experience ||  !location || !currentCTC || !noticePeriod){
            return res.status(404).send({
                success:false,
                message:'Please fill all fields',
            })
        }

        const seeker = await Seeker.create({
            firstName,
            lastName,
            skills,
            experience,
            location,
            currentCTC,
            noticePeriod
        })

        return res.status(200).send({
            success:true,
            seeker, 
            message:'Job Seeker Registered Successfully',
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
          success: false,
          message: "Seeker cannot be registered. Please try again.",
        })
      }
}

exports.getAllSeekers = async (req, res) => {
    try{
        const allSeekers = await Seeker.find();

        return res.status(200).send({
            success:true,
            allSeekers,
            message:'All Job Seeker Fetched Successfully',
        })
    } catch(error){
        return res.status(500).send({
            success:false,
            message:"Can not fetch Job Seeker's Data",
            error:error.message,
        })
    }
}

exports.updateSeekerDetails = async (req, res) => {
    try {
        const { seekerId } = req.params; 
        
        const {
            firstName,
            lastName,
            skills,
            experience,
            location,
            currentCTC,
            noticePeriod
        } = req.body;

        const updatedSeeker = await Seeker.findByIdAndUpdate(
            seekerId,  
            {
                firstName,
                lastName,
                skills,
                experience,
                location,
                currentCTC,
                noticePeriod
            },
            { new: true } 
        );

        if (!updatedSeeker) {
            return res.status(404).send({
                success: false,
                message: 'Seeker not found',
            });
        }

        return res.status(200).send({
            success: true,
            updatedSeeker,
            message: 'Job Seeker Details Updated Successfully',
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error updating Seeker details. Please try again.",
            error: error.message,
        });
    }
}

exports.deleteSeeker = async(req, res)=>{
    try {
        const { seekerId } = req.params;

        const deletedSeeker = await Seeker.findByIdAndDelete(seekerId);

        if(!deletedSeeker){
            return res.status(404).send({ 
                success:false, 
                message:'Can not find Job Seeker'
            })
        }

        return res.status(200).send({
            success: true,
            message: 'Job Seeker Deleted Successfully',
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error deleting Seeker. Please try again.",
            error:error.message,
        });
    }
}

exports.getJobsBySkills = async (req, res) => {
    try {
        const { seekerId } = req.params;

        const seeker = await Seeker.findById(seekerId);
        if (!seeker) {
            return res.status(404).json({ 
                success: false, 
                message: "Seeker not found" 
            });
        }

        const matchingJobs = await Job.find({
            skill: { $in: seeker.skills }
        });

        return res.status(200).json({
            success: true,
            jobs: matchingJobs,
            message: "Jobs matching your skills",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error fetching jobs",
            error: error.message,
        });
    }
};

exports.applyForJob = async (req, res) => {
    try {
        const { seekerId, jobId } = req.params; 

        if (!seekerId || !jobId) {
            return res.status(400).json({ success: false, message: "Missing seekerId or jobId" });
        }

        const seeker = await Seeker.findById(seekerId);
        if (!seeker) return res.status(404).json({ success: false, message: "Seeker not found" });

        const job = await Job.findById(jobId);
        if (!job) return res.status(404).json({ success: false, message: "Job not found" });

        if (seeker.appliedForJobs.includes(jobId) || job.candidateApplied.includes(seekerId)) {
            return res.status(400).json({ success: false, message: "Already applied for this job" });
        }

        seeker.appliedForJobs.push(jobId);
        await seeker.save();
        job.candidateApplied.push(seekerId);
        await job.save();

        return res.status(200).json({ success: true, message: "Applied for job successfully." });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error applying for job", error: error.message });
    }
};

exports.searchSeekers = async (req, res) => {
    try {
        const { skills, experience, location, maxCTC, noticePeriod } = req.query;

        let query = {};

        if (skills) {
            query.skills = { $in: skills.split(',').map(skill => skill.trim()) }; 
        }

        if (experience) {
            query.experience = { $gte: Number(experience) }; 
        }

        if (location) {
            query.location = location;
        }

        if (maxCTC) {
            query.currentCTC = { $lte: Number(maxCTC) }; 
        }

        if (noticePeriod) {
            query.noticePeriod = { $lte: Number(noticePeriod) }; 
        }

        const seekers = await Seeker.find(query);

        return res.status(200).json({
            success: true,
            seekers,
            message: "Seekers fetched successfully",
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error fetching seekers",
            error: error.message,
        });
    }
};
