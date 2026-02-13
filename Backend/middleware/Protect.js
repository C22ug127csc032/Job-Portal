const jwt=require('jsonwebtoken')
const Protect=async(req,res,next)=>{
    try {
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token=req.headers.authorization.split(' ')[1];
        }
        if(!token){
            return res.status(401).json({message:'No token, authorization denied'});
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded.userId || !decoded.role){
            return res.status(401).json({message:'Invalid token'});
        }
        req.user=decoded;
        next();
    } catch (error) {
        res.status(500).json({message:'Server error'});
    }
}
module.exports=Protect;