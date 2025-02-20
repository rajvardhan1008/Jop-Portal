const express = require("express")
const router = express.Router()

const {
    sendotp
} = require("../controllers/Otp");


router.post('/generate', sendotp);
