const express = require("express");
const router = express.Router();

const {
    signupProvider,
    getAllProviders,
    updateProvider,
    deleteProvider,
    getProviderJobs
} = require("../controllers/Provider");

router.post('/signup', signupProvider);
router.get('/getall', getAllProviders);
router.put('/update/:providerId', updateProvider);
router.delete('/delete/:providerId', deleteProvider);
router.get('/jobs/:providerId', getProviderJobs);

module.exports = router;
