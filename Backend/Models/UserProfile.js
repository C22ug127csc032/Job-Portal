const mongoose=require('mongoose');

const userProfileSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    skills:{
        type:[String]
    },
    education:{
        type:String
    },
    location:{
        type:String
    },
    resume:{
        type:String 
    },
},{
    timestamps:true
})
const UserProfile=mongoose.model('UserProfile',userProfileSchema);
module.exports=UserProfile;