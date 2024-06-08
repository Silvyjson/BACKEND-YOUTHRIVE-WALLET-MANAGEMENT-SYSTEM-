const mongoose = require('mongoose');

const AuthSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  Wallet_Balance: { type: Number, default: 0 },
  role: { type: String, default: "user" },
  active: { type: Boolean, default: true },
  isVerified: { type: Boolean, default: false },
});

const AuthModel = mongoose.model('Users', AuthSchema);

module.exports = AuthModel;
