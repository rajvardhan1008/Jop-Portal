const express = require("express")
const router = express.Router()

const {
        seekerSignup,
        getAllSeekers,
        updateSeekerDetails,
        deleteSeeker,
        getJobsBySkills,
        applyForJob,
        searchSeekers
} = require("../controllers/Seeker");

router.post('/signup' ,seekerSignup);
router.get('/getall', getAllSeekers);
router.put('/update/:seekerId', updateSeekerDetails);
router.delete('/delete/:seekerId', deleteSeeker);
router.get('/jobbyskills', getJobsBySkills) 
router.get('/applyforjob/:seekerId/:jobId', applyForJob);
router.get('/search', searchSeekers);

module.exports = router;
