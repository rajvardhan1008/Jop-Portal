const express = require("express");
const router = express.Router();

const {
    createJob,
    fetchAllJobs,
    updateJob,
    deleteJob
} = require("../controllers/Job");

router.post('/create', createJob);
router.get('/all', fetchAllJobs);
router.put('/update/:jobId', updateJob);
router.delete('/delete/:jobId', deleteJob);

module.exports = router;
