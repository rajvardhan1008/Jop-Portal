const mongoose = require('mongoose');

const jobSchema = mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
            trim:true,
        },
        skill:[
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
        maxCTC:{
            type:Number,
        },
        noticePeriod:{
            type:Number,
            required:true,
            min:0,
        },
        providerId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"Provider"
        },
        candidateApplied:[
            {
                type : mongoose.Schema.Types.ObjectId,
                ref:"Seeker",
            }    
        ]
    }
)

module.exports = mongoose.model('Job', jobSchema);