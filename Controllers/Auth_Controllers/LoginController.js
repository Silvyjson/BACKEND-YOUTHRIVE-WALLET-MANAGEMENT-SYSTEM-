const AuthModel = require("../../Models/AuthModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await AuthModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    if (user.isActive === false) {
      return res.status(403).json({ message: "This account is deactivated" });
    }

    if (user.isVerified === false) {
      return res.status(403).json({ message: "Email not verified. Please check your inbox for the verification email." });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_TOKEN, {
      expiresIn: "30m",
    });

    const { password: _, ...safeUser } = user.toObject();

    return res.status(200).json({
      message: "Login successful",
      token,
      user: safeUser,
    });
  } catch (error) {
    return res.status(500).json({ error_message: error.message });
  }
};

// still working on this 

const handleLogout = (req, res) => {
  return res.status(200).json({ message: "Logout successful" });
};

module.exports = { handleLogin, handleLogout };
