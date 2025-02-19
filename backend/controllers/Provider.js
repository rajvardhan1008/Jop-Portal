const Provider = require('../models/Provider');
const Job = require('../models/Job');

exports.signupProvider = async (req, res) => {
    try {
        const { 
            firstName, 
            lastName, 
            company, 
            email, 
            mobile 
        } = req.body;

        if (!firstName || !lastName || !company || !email || !mobile) {
            return res.status(404).send({
                success: false,
                message: 'Please fill all fields',
            });
        }

        const provider = await Provider.create({
            firstName,
            lastName,
            company,
            email,
            mobile,
        });

        return res.status(200).send({
            success: true,
            provider,
            message: 'Job Provider Registered Successfully',
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Unable to Register Provider",
        });
    }
};

exports.getProviderById = async(req, res)=>{
    const {providerId} = req.params;
    try{
        const user = await Provider.findById(providerId);
        if(!user){
            return res.status(404).send({
                success:false,
                message:'User Not Found'
            });
        }

        return res.status(200).send({
            success:true,
            user, 
            message:'User Fetched Successfully',
        });
        
    } catch(err){
        return res.status(500).send({
            success:false,
            message:'User Error',
        })
    }
}

exports.getAllProviders = async (req, res) => {
    try {
        const allProviders = await Provider.find();

        return res.status(200).send({
            success: true,
            allProviders,
            message: 'All Job Providers Fetched Successfully',
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Cannot fetch Job Provider's Data",
            error: error.message,
        });
    }
};

exports.updateProvider = async (req, res) => {
    try {
        const { providerId } = req.params;
        const { 
            firstName, 
            lastName, 
            company, 
            email, 
            mobile 
        } = req.body;

        const updatedProvider = await Provider.findByIdAndUpdate(
            providerId,
            {
                firstName,
                lastName,
                company,
                email,
                mobile,
            },
            { new: true}
        );

        if (!updatedProvider) {
            return res.status(404).send({
                success: false,
                message: 'Provider not found',
            });
        }

        return res.status(200).send({
            success: true,
            updatedProvider,
            message: 'Job Provider Details Updated Successfully',
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error updating Provider details. Please try again.",
        });
    }
};

exports.deleteProvider = async (req, res) => {
    try {
        const { providerId } = req.params;

        const deletedProvider = await Provider.findByIdAndDelete(providerId);

        if (!deletedProvider) {
            return res.status(404).send({
                success: false,
                message: 'Provider not found',
            });
        }

        return res.status(200).send({
            success: true,
            message: 'Job Provider Deleted Successfully',
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error deleting Provider. Please try again.",
        });
    }
};

exports.getProviderJobs = async(req, res) => {
    try{
        const {providerId} = req.params;

        const response = await Job.find({
            providerId: providerId
        })

        if(!response){
            return res.status(404).send({
                success:false,
                message:'Provider Not Found',
            })
        }

        return res.status(200).send({
            success:true,
            data:response,
            message: "Provider Jobs Fetched Successfully",
        })
    } catch(err){
        return res.status(500).send({
            success:false,
            message:"Unable to Fetch Provider Jobs",
        })
    }
}

