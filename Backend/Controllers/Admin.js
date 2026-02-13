const job=require("../Models/Job")

const approveJob=async(req,res)=>{
    try {
        const updatejob=await job.findByIdAndUpdate(req.params.id,{isApproved:true},{new:true});
        if(!updatejob){
            return res.status(404).json({message:'Job not found'});
        }
        res.status(200).json({message:'Job approved successfully',job:updatejob});
    } catch (error) {
        res.status(500).json({message:'Error approving job',error:error.message});
        console.log(error)
    }
}
const getPendingJobs = async (req, res) => {
  try {
    const jobs = await job.find({ isApproved: false })
      .populate("employer", "name email companyName");

    res.status(200).json({message: "Pending jobs fetched successfully",jobs: jobs});

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};


module.exports = { approveJob,getPendingJobs };
