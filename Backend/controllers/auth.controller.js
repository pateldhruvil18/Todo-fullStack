const bcrypt = require("bcryptjs");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const sendEmail = require("../utils/sendEmail");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (!email.includes("@")) {
      return res.status(400).json({
        message: "Invalid email",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // send email FIRST
    await sendEmail(email, otp);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      otp,
      otpExpires: Date.now() + 10 * 60 * 1000,
    });

    res.status(200).json({
      message: "OTP sent to email",
      userId: user._id,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

exports.verifyOtp = async (req, res) => {
    const {userId, otp} = req.body

    const user = await User.findById(userId);


    if(!user){
        return res.status(404).json({message: "User not found"});
    }

    if(user.otp !== otp){
        return res.status(400).json({message: "Invalid otp"});
    }

    if(user.otpExpires < Date.now()){
        return res.status(400).json({message: "Otp expired"})
    }

    user.isVerified = true;

    user.otp = null

    await user.save()

    res.json({message: "Account verified"})
}

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if(!user.isVerified){
        return res.status(400).json({
            message: "Please  verify email first"
        })
    }

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else{
        res.status(401).json({
            message:"Invalid Credentails",
        })
    }
}

exports.getMe = async (req, res) => {
    res.json(req.user);
}