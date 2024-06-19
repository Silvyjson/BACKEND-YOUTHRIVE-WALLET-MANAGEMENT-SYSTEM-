const express = require("express");

const authenticateUser = require("../MiddleWare/AuthentificateUser");
const handleAddFunds = require("../Controllers/Transaction_Controllers/AddFundsController");
const handleWithdrawFunds = require("../Controllers/Transaction_Controllers/WithdrawFundsController");
const handleTransferFunds = require("../Controllers/Transaction_Controllers/TransferFundsController");
const {handleGetTransacHistory, handleGetWalletBalance} = require("../Controllers/Transaction_Controllers/GetTransacHistoryController");


const TransacRoutes = express.Router();

TransacRoutes.post("/addFunds", authenticateUser, handleAddFunds );

TransacRoutes.post("/withdrawFunds", authenticateUser, handleWithdrawFunds );

TransacRoutes.post("/transferFunds", authenticateUser, handleTransferFunds);

TransacRoutes.get("/transactionHistory", authenticateUser, handleGetTransacHistory);

TransacRoutes.get("/getBalance", authenticateUser, handleGetWalletBalance);

module.exports = TransacRoutes;
