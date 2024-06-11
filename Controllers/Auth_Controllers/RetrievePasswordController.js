const AuthModel = require("../../Models/AuthModel");
const SendResetPasswordMail = require("../../Utilities/SendResetPasswordMail");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (
      !email ||
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    ) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const user = await AuthModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ error_message: "User not found" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_TOKEN, {
      expiresIn: "10m",
    });

    // URL to the frontend with the token as a query parameter
    const ResetLink = `http://localhost:8008/api/resetPassword?token=${token}`;

    await SendResetPasswordMail(email, user.firstName, ResetLink);

    return res
      .status(200)
      .json({ message: "Reset password link has been sent to your email" });
  } catch (error) {
    return res.status(500).json({ error_message: error.message });
  }
};

const handleResetPassword = async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({ error_message: "Something went wrong" });
    }

    const { password } = req.body;

    if (
      !password ||
      password.length < 6 ||
      !/(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[$#&])/.test(password)
    ) {
      return res.status(400).json({
        message:
          "Password must be at least 6 characters long and must contain at least one number, one uppercase and one special character",
      });
    }

    const ResetToken = jwt.verify(token, process.env.JWT_TOKEN);
    const user = await AuthModel.findById(ResetToken.userId);

    if (!user) {
      return res.status(400).json({ message: "Invalid token" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;

    await user.save();

    return res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    return res.status(500).json({ error_message: error.message });
  }
};

module.exports = {
  handleForgotPassword,
  handleResetPassword,
};
