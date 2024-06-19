const AuthModel = require("../../Models/AuthModel");
const TransactionModel = require("../../Models/TransactionModel");

const handleGetTransacHistory = async (req, res) => {
  try {
    const { id } = req.user;

    const transactions = await TransactionModel.find({ user: id });
    return res.status(200).json(transactions);
  } catch (error) {
    return res.status(500).json({ error_message: error.message });
  }
};

const handleGetWalletBalance = async (req, res) => {
  try {
    const { id } = req.user;

    const user = await AuthModel.findById(id);

    if (!user) {
      return res.status(404).json({ error_message: "User not found" });
    }

    const Wallet_Balance = user.Wallet_Balance;

    return res.status(200).json({Balance: Wallet_Balance});
  } catch (error) {
    return res.status(500).json({ error_message: error.message });
  }
};

module.exports = {handleGetTransacHistory, handleGetWalletBalance};
