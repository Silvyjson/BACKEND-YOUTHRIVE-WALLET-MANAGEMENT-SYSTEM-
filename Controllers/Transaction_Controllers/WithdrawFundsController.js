const AuthModel = require("../../Models/AuthModel");
const TransactionModel = require("../../Models/TransactionModel");

// still working on this

// withdrawing funds to external accounts
const handleWithdrawFunds = async (req, res) => {
try{
    const { amount, description } = req.body;

    if (!amount || !description){
        return res.status(400).json({message: "Amount and discription are required"});
    }

    const user = await AuthModel.findById(req.user.id);

    if (!user){
        return res.status(400).json({error_message: "User not found"});
    }

    if (user.Wallet_Balance < amount){
        return res.status(400).json({error_message: "Insufficient funds"});
    }

    user.Wallet_Balance -= amount;
    await user.save();

    const newTransaction = new TransactionModel({
        date,
        user: user.id,
        type: 'debit',
        amount,
        description,
    })

    await newTransaction.save();
    return res.status(200).json({success_message: "Funds added successfully"});
}catch(error){
    return res.status(400).json({error_message: error.message});
}
};

module.exports = handleWithdrawFunds;
