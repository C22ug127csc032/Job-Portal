const express = require('express');
const router = express.Router();
const { registerEmployer, loginEmployer, getEmployerProfile, updateEmployerProfile,forgotPassword,resetPassword } = require('../Controllers/Employer');
const Protect = require('../middleware/Protect');
const employer = require('../middleware/Employer');

router.post('/register',registerEmployer)
router.post('/login',loginEmployer)
router.post("/forgot-password",forgotPassword)
router.post('/reset-password/:token',resetPassword)
router.get('/profile',Protect,employer,getEmployerProfile)
router.put('/profile',Protect,employer,updateEmployerProfile)

module.exports=router;