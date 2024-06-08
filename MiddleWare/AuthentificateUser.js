const jwt = require("jsonwebtoken");
const AuthModel = require("../Models/AuthModel");

// the Token is only getting the first user in the AuthModel
// still working on it

const authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const verifiedToken = jwt.verify(token, process.env.JWT_TOken);

    if (!verifiedToken) {
      return res.status(401).json({ message: "Access Denied" });
    }

    const user = await AuthModel.findOne({ id: verifiedToken.id });

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    console.log(user)

    // console.log(`Authenticated user: ${user._id}, role: ${user.role}`);

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
