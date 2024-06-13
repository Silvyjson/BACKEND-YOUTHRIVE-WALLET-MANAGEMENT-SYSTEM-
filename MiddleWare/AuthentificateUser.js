const jwt = require("jsonwebtoken");
const AuthModel = require("../Models/AuthModel");

const authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const verifiedToken = jwt.verify(token, process.env.JWT_TOKEN);

    if (!verifiedToken) {
      return res.status(401).json({ message: "Access Denied" });
    }

    const user = await AuthModel.findOne({ _id: verifiedToken.userId });

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    req.user = {
      id: user._id,
      role: user.role,
    };

    next();
  } catch (error) {
    return res.status(500).json({ error_message: error.message });
  }
};

module.exports = authenticateUser;
