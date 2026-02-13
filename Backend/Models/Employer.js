const mongoose=require('mongoose');

const employerSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    companyName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    companyWebsite:{
        type:String
    },
    location:{  
        type:String
    },
    industry:{
        type:String
    },
    role:{
        type:String,
        default:"employer"
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date
    
},{
    timestamps:true
})
const Employer=mongoose.model('Employer',employerSchema);
module.exports=Employer;