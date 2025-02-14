const mongoose = require('mongoose'); 

const seekerSchema = new mongoose.Schema(
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
        skills:[
            {
                type:String,
                required:true,
                trim:true,
            }
        ],
        experience:{
            type:Number,
            required:true,
            min:0,
        },
        location:{
            type:String,
        },
        currentCTC:{
            type:Number,
            required:true,
            min:0,
        },
        noticePeriod:{
            type:Number,
            default:0,
        },
        appliedForJobs:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Job",
            }
        ]
    },
    {timestamps:true}
)

module.exports = mongoose.model("Seeker", seekerSchema);