const AuthModel = require("../../Models/AuthModel");
const TransactionModel = require("../../Models/TransactionModel");
const SendEmail = require("../../Utilities/SendEmail");
const { CreditAlertMail } = require("../../VIEW/mailDetails");

// addind funds by cash
const handleAddFunds = async (req, res) => {
  try {
    const { amount, description } = req.body;

    if (!amount || !description) {
      return res
        .status(400)
        .json({ message: "Amount and discription are required" });
    }

    const user = await AuthModel.findById(req.user.id);

    if (!user) {
      return res.status(400).json({ error_message: "User not found" });
    }

    user.Wallet_Balance += amount;
    await user.save();

    const date = new Date().toLocaleString();

    const newTransaction = new TransactionModel({
      date,
      user: user.id,
      type: "credit",
      amount,
      description,
      balance: user.Wallet_Balance,
    });

    await newTransaction.save();

    const subject = "Credit Alert";
    const message = CreditAlertMail(
      user.firstName,
      amount,
      date,
      user.Account_Number,
      "","","",
      description,
      user.Wallet_Balance
    );

    await SendEmail(user.email, subject, message);

    return res
      .status(200)
      .json({ success_message: "Funds added successfully" });
  } catch (error) {
    return res.status(400).json({ error_message: error.message });
  }
};

module.exports = handleAddFunds;
