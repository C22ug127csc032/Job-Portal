const express=require('express');
const app=express();
const connectDB=require('./Config/Db');
const userProfileRoutes=require('./routes/UserProfile');
const employerRoutes=require('./routes/Employer');
const UserAuthRoutes=require('./routes/User');
const jobRoutes=require('./routes/Job');
const applyJob=require('./routes/Application')
const adminRoutes=require('./routes/Admin')
const cors=require('cors');
require('dotenv').config();
connectDB();
app.use(express.json());
const port=process.env.PORT || 3000;
app.use(cors());
app.use("/user",UserAuthRoutes);
app.use("/userprofile",userProfileRoutes);
app.use("/employer",employerRoutes);
app.use("/job",jobRoutes);
app.use("/apply",applyJob)
app.use("/admin",adminRoutes)
app.get("/",(req,res)=>{
    res.send("Job Portal Backend is running");
})
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});