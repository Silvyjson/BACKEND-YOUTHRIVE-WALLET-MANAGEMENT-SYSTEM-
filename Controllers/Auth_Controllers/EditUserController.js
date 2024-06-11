const AuthModel = require("../../Models/AuthModel");

const handleEditUser = async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber, address } = req.body;

    //using authenticateUser token req.user instead of req.params
    const { id } = req.user;

    const user = await AuthModel.findByIdAndUpdate(
      id,
      { firstName, lastName, phoneNumber, address },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "Changes saved successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({ error_message: error.message });
  }
};

const handleDeleteUser = async (req, res) => {
  try {
    //using authenticateUser token req.user instead of req.params
    const { id } = req.user;

    const user = await AuthModel.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error_message: error.message });
  }
};

const handleDeactivateUser = async (req, res) => {
  try {
    //using authenticateUser token req.user instead of req.params
    const { id } = req.user;

    const user = await AuthModel.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isActive === true) {
      user.isActive = false;
    } else {
      return res.status(400).json({ message: "Account has already been disactivated" });
    }

    await user.save();

    return res.status(200).json({ message: "Account Deativated successfully" });
  } catch (error) {
    return res.status(500).json({ error_message: error.message });
  }
};

const handleActivateUser = async (req, res) => {
  try {
    //using authenticateUser token req.user to get requesting user info
    const requestingUser = req.user;

    //using email to get the user to activate information
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const userToActivate = await AuthModel.findOne({email});

    if (!userToActivate) {
      return res.status(400).json({ message: "User not found" });
    }

    if (userToActivate.isActive === true) {
      return res.status(400).json({ message: "Account has already been activated" });
    }

    if (requestingUser.role === "admin") {
      userToActivate.isActive = true;
      await userToActivate.save();
      return res.status(200).json({ message: "Account activated successfully" });
    } else {
      return res.status(403).json({ message: "You do not have permission to activate this account" });
    }
  } catch (error) {
    return res.status(500).json({ error_message: error.message });
  }
};

module.exports = {
  handleEditUser,
  handleDeleteUser,
  handleDeactivateUser,
  handleActivateUser,
};
