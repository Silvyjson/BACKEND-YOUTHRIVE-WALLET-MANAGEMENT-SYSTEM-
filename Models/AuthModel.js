const mongoose = require('mongoose');

const AuthSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: Number , required: true},
  address: { type: String, required: true},
  Account_Number: { type: Number, required: true, unique: true },
  Wallet_Balance: { type: Number, default: 0 },
  role: { type: String, default: "user" },
  isActive: { type: Boolean, default: true },
  isVerified: { type: Boolean, default: false },
  registrationTime: { type: Date, default: Date.now },
  verificationToken: { type: String}
});

const AuthModel = mongoose.model('Users', AuthSchema);

module.exports = AuthModel;
