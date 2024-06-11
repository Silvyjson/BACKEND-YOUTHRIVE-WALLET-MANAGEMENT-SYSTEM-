const TransactionModel = require("../../Models/TransactionModel");

const handleGetTransacHistory = async(req, res) => {
    try {
        const {id} = req.user;

        const transactions = await TransactionModel.find({user: id});
       return res.status(200).json(transactions);
    } catch (error) {
       return res.status(500).json({ error_message: error.message });
    }   
}

module.exports = handleGetTransacHistory;