const User = require('../Models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto=require('crypto')
const nodemailer=require('nodemailer')
const registerUser = async (req, res) => {
  try {
    const { name, email, password,role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role:"user"
    });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({ token ,role:user.role});
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
const forgotPassword=async(req,res)=>{
  try {
    const {email}=req.body
    const user=await User.findOne({email})
    if(!user){
       return res.status(404).json({ message: "User not found" });
    }
    const resetToken=crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken=resetToken;
    user.resetPasswordExpire=Date.now()+10*60*1000;
    await user.save()
    const resetUrl= `http://localhost:5173/reset-password/${resetToken}`;

    const transporter=nodemailer.createTransport({
      service:"gmail",
      auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS
      }
    })
    await transporter.sendMail({
      to:user.email,
      subject:"Password Reset",
      html:`
        <h3>Password Reset Request</h3>
        <p>Click the link below to reset your password:</p>
        <a href="${resetUrl}">${resetUrl}</a>
      `
    })
    res.json({message:"Reset link send to email"})
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
const resetPassword=async(req,res)=>{
  try {
    const {token}=req.params;
    const {password}=req.body

    const user=await User.findOne({resetPasswordToken:token,resetPasswordExpire:{ $gt: Date.now() }})
    if(!user){
      return res.status(400).json({ message: "Invalid or expired token" });
    }
    const hashedPassword=await bcrypt.hash(password,10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    res.json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { registerUser, loginUser,forgotPassword,resetPassword };