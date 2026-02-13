const job=require('../Models/Job');

const createJob=async(req,res)=>{
    try {
        const {title,description,location,skillsRequired,jobType,experience,salary}=req.body;
        if(!title ||!description ||!location ||!skillsRequired ||!jobType ||!experience ||!salary){
            return res.status(400).json({message:'Please provide all required fields'});
        }
        const newJob=new job({
            title,
            description,    
            location,
            skillsRequired,
            jobType,
            experience,
            salary,
            employer:req.user.userId,
            isApproved:false
        });
        await newJob.save();
        res.status(201).json({message:'Job created successfully',job:newJob});
        
    } catch (error) {
        res.status(500).json({message:'Error creating job',error:error.message});
        console.log(error)
    }
}

const updateJob=async(req,res)=>{
    try {
        const employerId=req.user.userId;
        const jobId=req.params.id;

        delete req.body.employer;
        delete req.body.isApproved;

        const updatedjob=await job.findOneAndUpdate({_id:jobId,employer:employerId},{$set:req.body},{new:true,runValidators:true});
        if(!updatedjob){
            return res.status(404).json({message:'Job not found or unauthorized'});
        }
        res.status(200).json({message:'Job updated successfully',job:updatedjob});
    } catch (error) {
        res.status(500).json({message:'Error updating job',error:error.message});
    }
}
const getMyJobs = async (req, res) => {
  try {
    const jobs = await job.find({ employer: req.user.userId });

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteJob=async(req,res)=>{
    try {
        const employerId=req.user.userId;
        const jobId=req.params.id;
        const deletedjob=await job.findOneAndDelete({_id:jobId,employer:employerId});
        if(!deletedjob){
            return res.status(404).json({message:'Job not found or unauthorized'});
        }   
        res.status(200).json({message:'Job deleted successfully'});     
    } catch (error) {
        res.status(500).json({message:'Error deleting job',error:error.message});
    }
}
const getJobsById=async(req,res)=>{
    try {
        const getjob=await job.findById(req.params.id).populate('employer','name email company');
        if(!getjob){
            return res.status(404).json({message:'Job not found'});
        }
        res.status(200).json({message:'Job retrieved successfully',job:getjob});
        
    } catch (error) {
        res.status(500).json({message:'Error retrieving job',error:error.message});
    }
}

const getAllJobs=async(req,res)=>{
    try {
        const jobs=await job.find({isApproved:true}).populate('employer','name email companyName');
        res.status(200).json({message:'Jobs retrieved successfully',jobs});
        
    } catch (error) {
        res.status(500).json({message:'Error retrieving jobs',error:error.message});
    }
}
module.exports={createJob,updateJob,deleteJob,getAllJobs,getJobsById,getMyJobs};