const express = require('express');
const {  getUserProfile, UpdateUserProfile, createUserProfile } = require('../Controllers/UserProfile');
const Protect = require('../middleware/Protect');
const router = express.Router();
router.post('/',Protect, createUserProfile);
router.get('/profile',Protect,getUserProfile)
router.put('/profile',Protect,UpdateUserProfile)

module.exports=router;