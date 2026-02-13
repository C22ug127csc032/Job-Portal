const express = require('express');
const router = express.Router();
const protect = require('../middleware/Protect');
const employer = require('../middleware/Employer');
const admin = require('../middleware/Admin');
const {createJob,updateJob,deleteJob,getAllJobs,getJobsById, getMyJobs}=require('../Controllers/Job');

router.post('/',protect,employer,createJob);
router.get('/my-job', protect, employer, getMyJobs);
router.put('/:id',protect,employer,updateJob);
router.delete('/:id',protect,employer,deleteJob);
router.get('/',getAllJobs);
router.get('/:id',getJobsById);


module.exports=router;