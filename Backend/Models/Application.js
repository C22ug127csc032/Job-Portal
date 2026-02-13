const mongoose=require('mongoose');

const applicationSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    job:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Job',
        required:true
    },
    userProfile:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"UserProfile"
    },
    status:{
        type:String,
        enum:['applied','under review','accepted','rejected'],
        default:'applied'
    }
},{
    timestamps:true
})
const Application=mongoose.model('Application',applicationSchema);
module.exports=Application;