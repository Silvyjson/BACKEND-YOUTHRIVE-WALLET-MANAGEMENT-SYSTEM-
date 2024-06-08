const express = require("express");

const authenticateUser = require("../MiddleWare/AuthentificateUser");
const handelAddFunds = require("../Controllers/Transaction_Controllers/AddFundsController");
const handleTransferFunds = require("../Controllers/Transaction_Controllers/TransferFundsController");

const TransacRoutes = express.Router();

TransacRoutes.post("/addFunds", authenticateUser, handelAddFunds );

TransacRoutes.post("WithdrawFunds");

TransacRoutes.post("/transferFunds", authenticateUser, handleTransferFunds);

TransacRoutes.get("/transactionHistory");

module.exports = TransacRoutes;
