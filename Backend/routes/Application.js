const express=require('express')
const { applyJob, getMyApplication, getAllApplications, getEmployerApplications, updateApplicationStatus } = require('../Controllers/Application')
const Protect = require('../middleware/Protect')
const admin = require('../middleware/Admin')
const Employer=require('../middleware/Employer')
const router=express.Router()

router.post("/:jobId",Protect,applyJob)
router.get("/",Protect,getMyApplication)
router.get("/employer",Protect,Employer,getEmployerApplications)
router.get("/all",Protect,admin,getAllApplications)
router.put("/status/:applicationId",Protect,Employer,updateApplicationStatus)

module.exports=router;



