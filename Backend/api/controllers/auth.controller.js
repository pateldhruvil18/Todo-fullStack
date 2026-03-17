const bcrypt = require("bcrypt");
const otpGenerator = require("otp-generator");
const httpStatus = require("http-status").status;
const User = require("../models/user.schema");
const generateToken = require("../utils/generateTokens");
const sendEmail = require("../helpers/sendMail");
const { handleError } = require("../utils/handleError");
const { buildResponse } = require("../utils/buildResponse");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(httpStatus.BAD_REQUEST).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = otpGenerator.generate(6, { 
        upperCaseAlphabets: false, 
        specialChars: false, 
        lowerCaseAlphabets: false 
    });

    // send email FIRST
    await sendEmail(email, otp);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      otp,
      otpExpires: Date.now() + 10 * 60 * 1000,
    });

    res.status(httpStatus.CREATED).json(buildResponse("OTP sent to email", { userId: user._id }));

  } catch (error) {
    handleError(res, error);
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { userId, otp } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({ message: "User not found" });
    }

    if (user.otp !== otp) {
      return res.status(httpStatus.BAD_REQUEST).json({ message: "Invalid otp" });
    }

    if (user.otpExpires < Date.now()) {
      return res.status(httpStatus.BAD_REQUEST).json({ message: "Otp expired" });
    }

    user.isVerified = true;
    user.otp = null;
    await user.save();

    res.status(httpStatus.OK).json(buildResponse("Account verified"));
  } catch (error) {
    handleError(res, error);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(httpStatus.UNAUTHORIZED).json({ message: "Invalid Credentials" });
    }

    if (!user.isVerified) {
      return res.status(httpStatus.FORBIDDEN).json({
        message: "Please verify email first",
      });
    }

    if (await bcrypt.compare(password, user.password)) {
      res.status(httpStatus.OK).json(buildResponse("Login successful", {
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      }));
    } else {
      res.status(httpStatus.UNAUTHORIZED).json({
        message: "Invalid Credentials",
      });
    }
  } catch (error) {
    handleError(res, error);
  }
};

exports.getMe = async (req, res) => {
  res.status(httpStatus.OK).json(req.user);
};
