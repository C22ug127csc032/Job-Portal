const employer = async (req, res, next) => {
    try {
        if(!req.user || req.user.role!=="employer"){
            return res.status(403).json({message:'Access denied. Employers only.'});
        }
        next();
    } catch (error) {
        res.status(500).json({message:'Error in employer middleware',error:error.message});
    }
}
module.exports = employer;