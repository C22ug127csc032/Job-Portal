const Employer = require("../Models/Employer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto=require("crypto")
const nodemailer=require("nodemailer")


const registerEmployer=async(req,res)=>{
    try {
        const {name,email,password,companyName,companyWebsite,location,industry}=req.body;
        if(!name ||!email ||!password ||!companyName ||!companyWebsite ||!location ||!industry){
            return res.status(400).json({message:'Please provide all required fields'});
        }
        const existingEmployer=await Employer.findOne({email});
        if(existingEmployer){
            return res.status(400).json({message:'Employer already exists'});
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const newEmployer=new Employer({
            name,
            email,
            password:hashedPassword,
            companyName,
            companyWebsite,
            location,
            industry,
            role:"employer",
            isApproved:false
        })
        await newEmployer.save();
        res.status(201).json({message:'Employer registered successfully'});
        
    } catch (error) {
        res.status(500).json({message:'Error registering employer',error});
    }
}
const loginEmployer=async(req,res)=>{
    try {
        const {email,password}=req.body;
        const employer= await Employer.findOne({email});
        if(!employer){
            return res.status(400).json({message:'Invalid credentials'});
        }
        const isMatch=await bcrypt.compare(password,employer.password);
        if(!isMatch){
            return res.status(400).json({message:'Invalid credentials'});
        }
        const token=jwt.sign(
            {userId:employer._id,role:employer.role},
            process.env.JWT_SECRET,
            {expiresIn:'1d'}
        )
        res.status(200).json({token});
    } catch (error) {
        res.status(500).json({message:'Error logging in employer',error});
    }
}
const getEmployerProfile=async(req,res)=>{
    try {
        const employer=await Employer.findById(req.user.userId).select('-password');
        if(!employer){
            return res.status(404).json({message:'Employer not found'});
        }
        res.status(200).json({employer}); 
    } catch (error) {
        console.error(error);
        res.status(500).json({message:'Error fetching employer profile',error});
    }
}
const updateEmployerProfile=async(req,res)=>{
    try {
        const employer=await Employer.findByIdAndUpdate(req.user.userId,req.body,{new:true}).select('-password');
        if(!employer){
            return res.status(404).json({message:'Employer not found'});
        }
        res.status(200).json({employer});
    } catch (error) {
        res.status(500).json({message:'Error updating employer profile',error});
    }
}
const forgotPassword=async(req,res)=>{
    try {
        const {email}=req.body
        const employer=await Employer.findOne({email}) 
        if(!employer){
             return res.status(404).json({ message: "Employer not found" });
        }
        const resetToken=crypto.randomBytes(32).toString("hex")
        employer.resetPasswordToken=resetToken;
        employer.resetPasswordExpire=Date.now()+10*60*1000;
        await employer.save()

        const resetUrl=`http://localhost:5173/employer-reset-password/${resetToken}`;
        const transporter=nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.EMAIL_USER,
                pass:process.env.EMAIL_PASS
            }
        })
        await transporter.sendMail({
            to:employer.email,
            subject:"Employer Password Reset",
            html: `
        <h3>Password Reset Request</h3>
        <p>Click the link below to reset your password:</p>
        <a href="${resetUrl}">${resetUrl}</a>
      `     
        })
         res.json({ message: "Reset link sent to employer email" });


    } catch (error) {
         res.status(500).json({ message: error.message });
    }
}
const resetPassword=async(req,res)=>{
    try {
        const {token}=req.params;
        const {password}=req.body
        const employer=await Employer.findOne({resetPasswordToken:token, resetPasswordExpire: { $gt: Date.now() }})
        
        if(!employer){
            res.status(400).json({message:"Invaild or Expiry token"})
        }
        const hashpassword=await bcrypt.hash(password,10)
        employer.password=hashpassword;
        employer.resetPasswordToken=undefined;
        employer.resetPasswordExpire=undefined;
        await employer.save()
         res.json({ message: "Password reset successful" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
module.exports={registerEmployer,loginEmployer,getEmployerProfile,updateEmployerProfile,forgotPassword,resetPassword};
