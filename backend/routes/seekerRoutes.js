const express = require("express")
const router = express.Router()

const {
        seekerSignup,
        getAllSeekers,
        getSeekerById,
        updateSeekerDetails,
        deleteSeeker,
        getJobsBySkills,
        applyForJob,
        seekerLogin,
        searchSeekers,
        getAppliedJobs
} = require("../controllers/Seeker");

router.post('/signup' ,seekerSignup);
router.get('/getall', getAllSeekers);
router.post('/login', seekerLogin);
router.get('/get-seeker/:seekerId', getSeekerById);
router.put('/update/:seekerId', updateSeekerDetails);
router.delete('/delete/:seekerId', deleteSeeker);
router.get('/jobbyskills', getJobsBySkills) 
router.get('/applyforjob/:seekerId/:jobId', applyForJob);
router.get('/search', searchSeekers);
router.get('/applied-jobs/:seekerId', getAppliedJobs);

module.exports = router; 
