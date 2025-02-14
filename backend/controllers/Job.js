const Job = require('../models/Job');
const Provider = require('../models/Provider');

exports.createJob = async (req, res) => {
    try {
        const { 
            title, 
            skill, 
            experience, 
            location, 
            maxCTC, 
            noticePeriod, 
            providerId } = req.body;

        if (!title || !skill || !experience || !noticePeriod || !providerId) {
            return res.status(400).send({
                success: false,
                message: 'Please fill all required fields',
            });
        }

        const provider = await Provider.findById(providerId);
        if (!provider) {
            return res.status(404).send({
                success: false,
                message: 'Provider not found',
            });
        }

        const job = await Job.create({
            title,
            skill,
            experience,
            location,
            maxCTC,
            noticePeriod,
            providerId,
        });
        
        return res.status(201).send({
            success: true,
            job,
            message: 'Job Created Successfully',
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Unalbe to create job',
        });
    }
};

exports.fetchAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find()
                            .populate('providerId', 'firstName lastName company'); 

        return res.status(200).send({
            success: true,
            jobs,
            message: 'All Jobs Fetched Successfully',
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Error fetching job's data",
        });
    }
};

exports.updateJob = async (req, res) => {
    try {
        const { jobId } = req.params;
        const { 
            title, 
            skill, 
            experience, 
            location, 
            maxCTC, 
            noticePeriod, 
            providerId } = req.body;

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).send({
                success: false,
                message: 'Job not found',
            });
        }

        const provider = await Provider.findById(providerId);
        if (!provider) {
            return res.status(404).send({
                success: false,
                message: 'Provider not found',
            });
        }

        const updatedJob = await Job.findByIdAndUpdate(
            jobId, 
            {
                title: title ,
                skill: skill ,
                experience: experience ,
                location: location ,
                maxCTC: maxCTC ,
                noticePeriod: noticePeriod ,
                providerId: providerId,
            },
            {
                new: true,
            }
        );

        return res.status(200).send({
            success: true,
            updatedJob,
            message: 'Job Updated Successfully',
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Error updating job. Please try again.',
        });
    }
};

exports.deleteJob = async (req, res) => {
    try {
        const { jobId } = req.params;

        const job = await Job.findByIdAndDelete(jobId);
        if (!job) {
            return res.status(404).send({
                success: false,
                message: 'Job not found',
            });
        }

        return res.status(200).send({
            success: true,
            message: 'Job Deleted Successfully',
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Error deleting job. Please try again.',
        });
    }
};
