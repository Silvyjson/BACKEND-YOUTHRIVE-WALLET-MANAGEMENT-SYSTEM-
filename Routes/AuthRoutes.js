const express = require("express");

const authVerification = require("../MiddleWare/authVerification");
const {handleRegistration, handleVerifyUSer} = require("../Controllers/Auth_Controllers/RegisterController");
const {handleLogin, handleLogout} = require("../Controllers/Auth_Controllers/LoginController");
const { handleEditUser, handleActivateUser, handleDeactivateUser, handleDeleteUser } = require("../Controllers/Auth_Controllers/EditUserController");
const { handleForgotPassword, handleResetPassword } = require("../Controllers/Auth_Controllers/RetrievePasswordController");
const authenticateUser = require("../MiddleWare/AuthentificateUser");

const AuthRouter = express.Router();

AuthRouter.post('/register', authVerification, handleRegistration)

AuthRouter.get('/verify-user', handleVerifyUSer)

AuthRouter.post('/login', handleLogin)

AuthRouter.post('/logout', handleLogout)

AuthRouter.patch('/editUser/:id' , authenticateUser , handleEditUser)

AuthRouter.post('/forgotPassword', handleForgotPassword )

AuthRouter.post('/resetPassword', handleResetPassword)

AuthRouter.patch('/disactivateUser/:id', handleDeactivateUser)

AuthRouter.patch('/activateUser/:id', authenticateUser , handleActivateUser)

AuthRouter.delete('/DeleteUser/:id', handleDeleteUser)

module.exports = AuthRouter;