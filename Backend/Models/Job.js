const mongoose=require('mongoose');

const jobSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    skillsRequired:{
        type:[String],
        required:true
    },
    location:{
        type:String,
        required:true
    },
    jobType:{
        type:String,
        enum:['full-time','part-time','contract','internship'],
        required:true
    },
    experience:{
        type:String,
        required:true
    },
    salary:{
        type:String,
        required:true
    },
    employer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Employer',
        required:true
    },
    isApproved:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})
const Job=mongoose.model('Job',jobSchema);
module.exports=Job;