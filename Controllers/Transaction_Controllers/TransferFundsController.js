const AuthModel = require("../../Models/AuthModel");
const TransactionModel = require("../../Models/TransactionModel");

// still working on this

const handleTransferFunds = async (req, res) => {
    try {
        const {receiver, amount, description } = req.body;

        if( !receiver || !amount || !description ) {
            return res.status(400).json({ message: 'Please fill all the fields' });
        }

        const senderAC = await AuthModel.findById(req.user.id);

        if (!senderAC) {
            return res.status(404).json({ message: "User not found" });
        }

        const receiverAC = await AuthModel.findOne({ email: receiver})

        if (!receiverAC) {
            return res.status(404).json({ message: 'Receiver not found' });
        }

        if (senderAC.Wallet_Balance < amount) {
            return res.status(400).json({ message: 'Insufficient funds' });
        }

        senderAC.Wallet_Balance -= amount;
        await senderAC.save();

        receiverAC.Wallet_Balance += amount;
        await receiverAC.save();

        const newTransaction = new TransactionModel({
            type: 'credit',
            sender: req.user.id,
            receiver,
            amount,
            description
        });

        await newTransaction.save();

        return res.status(200).json({ message: 'Wallet funded successfully' });

    } catch (error) {
        return res.status(400).json({ error_message: error.message });
    }
}

module.exports = handleTransferFunds;