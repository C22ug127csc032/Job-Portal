const express=require('express')
const router=express.Router()
const {approveJob,  getPendingJobs}=require('../Controllers/Admin')
const Protect=require('../middleware/Protect')
const Admin=require('../middleware/Admin')


router.put('/approve/:id',Protect,Admin,approveJob);

router.get('/pending-job',Protect,Admin,getPendingJobs);

module.exports=router