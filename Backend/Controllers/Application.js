const Application=require('../Models/Application')
const job=require('../Models/Job')
const userProfile=require('../Models/UserProfile')
const sendEmail=require('../Utils/SendEmail')
const applyJob = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { jobId } = req.params;

    const profile = await userProfile.findOne({ userId: userId });

    if (!profile) {
      return res.status(400).json({ success: false, message: "Please create profile before applying" });
    }

    const jobData = await job.findById(jobId);
    if (!jobData) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    const alreadyApplied = await Application.findOne({ user: userId, job: jobId});

    if (alreadyApplied) {
      return res.status(400).json({ success: false,message: "You already applied for this job"});
    }

    const application = await Application.create({
      user: userId,
      job: jobId,
      userProfile: profile._id
    });

    res.status(201).json({ success: true, message: "Job applied successfully",application });

  } catch (error) {
    res.status(500).json({ success: false,message: error.message});
  }
};


const getMyApplication=async(req,res)=>{
    try {
        const userId = req.user.userId;

    const applications = await Application.find({ user: userId }).populate("job");

    res.status(200).json({success: true,applications});

    } catch (error) {
        res.status(500).json({success: false,message: error.message});
    }
}
const getEmployerApplications = async (req, res) => {
  try {
    const employerId = req.user.userId;
    const employerJobs = await job.find({ employer: employerId });
    const jobIds = employerJobs.map(job => job._id);

    const applications = await Application.find({job: { $in: jobIds }}) 
    .populate("user", "name email").populate({
      path: "userProfile",select: "skills education location resume name" })
    .populate("job", "title location salary");
    res.status(200).json({success: true,applications});

  } catch (error) {
    res.status(500).json({ success: false, message: error.message});
  }
};


const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate("user", "name email")
      .populate({
        path: "job",
        select: "title location salary employer",
        populate: {
          path: "employer",
          select: "name companyName email"
        }
      });

    res.status(200).json({ success: true, count: applications.length, applications});

  } catch (error) {
    res.status(500).json({ success: false, message: error.message});
  }
};

const updateApplicationStatus=async(req,res)=>{
  try {
    const employerId=req.user.userId;
    const {applicationId}=req.params;
    const {status}=req.body

    const validStatuses=["applied", "under review", "accepted", "rejected"];

    if(!validStatuses.includes(status)){
      return res.status(400).json({ success: false, message: "Invalid status value"});
    }

      const application = await Application.findById(applicationId).populate("job").populate("user");

    if (!application) {
      return res.status(404).json({ success: false, message: "Application not found"});
    }

      if (application.job.employer.toString() !== employerId) {
      return res.status(403).json({success: false, message: "Not authorized to update this application"});
    }
    application.status = status;
    await application.save();

    if (status === "accepted" || status === "rejected") {
      await sendEmail(
        application.user.email,
        "Application Status Update",
        `Hello ${application.user.name},
         Your application for ${application.job.title} has been ${status}.
         Thank you for applying.`);
    }
    res.status(200).json({success: true,message: "Application status updated",application });
  } catch (error) {
     res.status(500).json({success: false,message: error.message});
  }
}



module.exports={applyJob,getMyApplication,getEmployerApplications,getAllApplications,updateApplicationStatus}
