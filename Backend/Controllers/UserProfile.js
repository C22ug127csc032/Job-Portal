const UserProfile = require('../Models/UserProfile');

const createUserProfile = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { skills, education, location, resume } = req.body;
        if (!skills || !education || !location || !resume) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const existingProfile = await UserProfile.findOne({ userId });
        if (existingProfile) {
            return res.status(400).json({ message: 'Profile already exists. Use update endpoint.' });
        }
        const newProfile = new UserProfile({userId,...req.body });
        await newProfile.save();
        res.status(201).json({ profile: newProfile });
        
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

const UpdateUserProfile = async (req, res) => {
  try {
    const userId = req.user.userId;

    delete req.body.userId;

    const profile = await UserProfile.findOneAndUpdate({ userId },{ $set: req.body },{ new: true, runValidators: true });

    if (!profile) {
      return res.status(404).json({
        message: 'Profile not found. Create profile first.'
      });
    }

    res.status(200).json({ profile });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};



const getUserProfile = async (req, res) => {
  try {
    const profile = await UserProfile.findOne({userId: req.user.userId}).populate('userId', 'name email');

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.status(200).json({ profile });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
module.exports = { createUserProfile,UpdateUserProfile, getUserProfile };
