const OTP = require("../models/OTP")
const otpGenerator = require("otp-generator")

exports.sendotp = async (req, res) => {
    try {
      const { email } = req.body
  
      var otp = otpGenerator.generate(4, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      })

      const result = await OTP.findOne({ otp: otp })
      console.log("IN SEND OTP",otp);
      console.log("Result", result)

      while (result) {
        otp = otpGenerator.generate(6, {
          upperCaseAlphabets: false,
        })
      }
      const otpPayload = { email, otp }

      const otpBody = await OTP.create(otpPayload)

      console.log("OTP Body", otpBody)
      res.status(200).json({
        success: true,
        message: `OTP Sent Successfully`,
        otp,
      })
    } catch (error) {
      console.log(error.message)
      return res.status(500).json({ success: false, error: error.message })
    }
  }
