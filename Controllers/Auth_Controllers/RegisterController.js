const AuthModel = require("../../Models/AuthModel");
const SendVerificationmail = require("../../Utilities/SendVerificationmail");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleRegistration = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    const existingUser = await AuthModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new AuthModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_TOKEN, {
      expiresIn: "1h",
    });

    const verificationLink = `http://localhost:8008/api/verify-user?token=${token}`;

    await SendVerificationmail(email, firstName, verificationLink);

    const { password: _, ...safeUser } = user.toObject();

    return res.status(200).json({
      message:
        "User registered successfully, a verification mail has been sent to your email address",
      newUser: safeUser,
    });
  } catch (error) {
    return res.status(400).json({ error_message: error.message });
  }
};

const handleVerifyUSer = async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({ message: "Something went wrong" });
    }

    const verificationToken = jwt.verify(token, process.env.JWT_TOKEN);
    const user = await AuthModel.findById(verificationToken.userId);

    if (!user) {
      return res.status(400).json({ message: "Invalid verification token" });
    }

    if (user.isVerified === true) {
      return res.status(400).json({ message: "User is already verified" });
    }

    user.isVerified = true;
    await user.save();

    return res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    return res.status(400).json({ error_message: error.message });
  }
};

module.exports = { handleRegistration, handleVerifyUSer };
