const AuthModel = require("../../Models/AuthModel");

const handleEditUser = async (req, res) => {
  try {
    const { firstName, lastName } = req.body;

    const { id } = req.params;

    const updatedUser = await AuthModel.findByIdAndUpdate(
      id,
      { firstName, lastName },
      { new: true }
    );

    return res.status(200).json({
      message: "Changes saved successfully",
      updatedUser,
    });
  } catch (error) {
    return res.status(400).json({ error_message: error.message });
  }
};

const handleDeleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await AuthModel.findByIdAndDelete(id);
    return res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    return res.status(400).json({ error_message: error.message });
  }
};

const handleDeactivateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await AuthModel.findById(id);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.active === true) {
      user.active = false;
    } else {
      return res.status(400).json({ message: "Account has already been disactivated" });
    }

    await user.save();

    return res.status(200).json({ message: "Account Deativated successfully" });
  } catch (error) {
    return res.status(400).json({ error_message: error.message });
  }
};

const handleActivateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const requestingUser = req.user;

    // console.log(`Request to activate user: ${id} by ${requestingUser.id}, role: ${requestingUser.role}`);

    const userToActivate = await AuthModel.findById(id);

    if (!userToActivate) {
      return res.status(400).json({ message: "User not found" });
    }

    if (requestingUser.role === "admin") {
      userToActivate.active = true;
      await userToActivate.save();
      return res.status(200).json({ message: "Account activated successfully" });
    } else {
      return res.status(403).json({ message: "You do not have permission to activate this account" });
    }
  } catch (error) {
    return res.status(400).json({ error_message: error.message });
  }
};

module.exports = {
  handleEditUser,
  handleDeleteUser,
  handleDeactivateUser,
  handleActivateUser,
};
