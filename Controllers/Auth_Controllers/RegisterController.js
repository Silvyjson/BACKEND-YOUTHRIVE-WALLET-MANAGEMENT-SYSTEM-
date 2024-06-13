const AuthModel = require("../../Models/AuthModel");
const generateAccountNumber = require("../../Utilities/GenarateACN");
const SendEmail = require("../../Utilities/SendEmail");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { VerificationMail } = require("../../VIEW/mailDetails");

const handleRegistration = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phoneNumber, address, role } =
      req.body;

    const existingUser = await AuthModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const Account_Number = await generateAccountNumber();

    const newUser = new AuthModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      Account_Number,
      phoneNumber,
      address,
      role,
    });

    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_TOKEN, {
      expiresIn: "1h",
    });

    const subject = "Verification Mail";

    // frontend link that handle's verification
    const verificationLink = `http://localhost:8008/api/verify-user?token=${token}`;

    const message = VerificationMail(firstName, verificationLink);

    await SendEmail(email, subject, message);

    const { password: _, ...safeUser } = newUser.toObject();

    return res.status(200).json({
      message:
        "User registered successfully, a verification mail has been sent to your email address",
      newUser: safeUser,
    });
  } catch (error) {
    return res.status(500).json({ error_message: error.message });
  }
};

const handleVerifyUser = async (req, res) => {
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
    return res.status(500).json({ error_message: error.message });
  }
};

module.exports = { handleRegistration, handleVerifyUser };
