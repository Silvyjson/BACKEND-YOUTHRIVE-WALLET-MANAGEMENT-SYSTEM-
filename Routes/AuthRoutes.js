const express = require("express");

const authVerification = require("../MiddleWare/AuthVerification");
const {handleRegistration, handleVerifyUser} = require("../Controllers/Auth_Controllers/RegisterController");
const {handleLogin, handleLogout} = require("../Controllers/Auth_Controllers/LoginController");
const { handleEditUser, handleActivateUser, handleDeactivateUser, handleDeleteUser } = require("../Controllers/Auth_Controllers/EditUserController");
const { handleForgotPassword, handleResetPassword } = require("../Controllers/Auth_Controllers/RetrievePasswordController");
const authenticateUser = require("../MiddleWare/AuthentificateUser");

const AuthRouter = express.Router();

AuthRouter.post('/register', authVerification, handleRegistration)

AuthRouter.get('/verify-user', handleVerifyUser)

AuthRouter.post('/login', handleLogin)

AuthRouter.post('/logout', handleLogout)

AuthRouter.post('/forgotPassword', handleForgotPassword )

AuthRouter.post('/resetPassword', handleResetPassword)

AuthRouter.patch('/editUser' , authenticateUser , handleEditUser)

AuthRouter.patch('/disactivateUser', authenticateUser, handleDeactivateUser)

AuthRouter.patch('/activateUser', authenticateUser , handleActivateUser)

AuthRouter.delete('/DeleteUser', authenticateUser, handleDeleteUser)

module.exports = AuthRouter;