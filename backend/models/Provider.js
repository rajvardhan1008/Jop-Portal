const mongoose = require('mongoose');

const providerSchema = mongoose.Schema(
    {
        firstName:{
            type:String,
            required:true,
            trim:true,
        },
        lastName:{
            type:String,
            required:true,
            trim:true,
        },
        company:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
            trim:true,
            lowercase:true,
        },
        mobile: {
            type: String,
            required: true,
            trim: true
        }
    }
)

module.exports = mongoose.model('Provider', providerSchema);