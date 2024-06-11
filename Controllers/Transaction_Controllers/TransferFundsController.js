const AuthModel = require("../../Models/AuthModel");
const TransactionModel = require("../../Models/TransactionModel");
const SendCreditAlertMail = require("../../Utilities/SendCreditAlertMail");
const SendDebitAlertMail = require("../../Utilities/SendDebitAlertMail");

// Handle transfer of funds between user accounts within the company.

const handleTransferFunds = async (req, res) => {
    try {
        const { accountNumber, amount, description } = req.body;

        if (!accountNumber || !amount || !description) {
            return res.status(400).json({ message: 'Please fill all the fields' });
        }

        const senderAC = await AuthModel.findById(req.user.id);

        if (!senderAC) {
            return res.status(404).json({ message: "User not found" });
        }

        const receiverAC = await AuthModel.findOne({ Account_Number: accountNumber });

        if (!receiverAC) {
            return res.status(404).json({ message: 'Receiver not found' });
        }

        if (senderAC.Account_Number === accountNumber) {
            return res.status(400).json({ message: 'Invalid Transaction' });
        }

        if (senderAC.Wallet_Balance < amount) {
            return res.status(400).json({ message: 'Insufficient funds' });
        }

        senderAC.Wallet_Balance -= amount;
        await senderAC.save();

        receiverAC.Wallet_Balance += amount;
        await receiverAC.save();

        const date = new Date().toLocaleString();

        const senderTransaction = new TransactionModel({
            type: 'debit',
            user: senderAC.id,
            amount,
            description,
            date,
            balance: senderAC.Wallet_Balance
        });

        const receiverTransaction = new TransactionModel({
            type: 'credit',
            user: receiverAC.id,
            amount,
            description,
            date,
            balance: receiverAC.Wallet_Balance
        });

        await senderTransaction.save();
        await receiverTransaction.save();

        const senderFirstName = senderAC.firstName;
        const senderLastName = senderAC.lastName;
        const senderAccount_Number = senderAC.Account_Number;
        const senderWallet_Balance = senderAC.Wallet_Balance;

        const receiverFirstName = receiverAC.firstName;
        const receiverLastName = receiverAC.lastName;
        const receiverAccount_Number = receiverAC.Account_Number;
        const receiverWallet_Balance = senderAC.Wallet_Balance;

        await SendDebitAlertMail(senderAC.email, senderFirstName, amount, date , senderAccount_Number, receiverFirstName, receiverLastName, receiverAccount_Number, description, senderWallet_Balance)
        await SendCreditAlertMail(receiverAC.email, receiverFirstName, amount, date, receiverAccount_Number, senderFirstName, senderLastName, senderAccount_Number, description, receiverWallet_Balance)

        return res.status(200).json({ message: 'Funds transferred successfully' });

    } catch (error) {
        return res.status(500).json({ error_message: error.message });
    }
}

module.exports = handleTransferFunds;
