const nodemailer = require('nodemailer');

const AUTH_EMAIL = process.env.EMAIL
const AUTH_PASSWORD =  process.env.PASSWORD

const SendResetPasswordMail = async(email, firstName, ResetLink) => {

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: AUTH_EMAIL,
            pass:  AUTH_PASSWORD
        }
    })

    const mailDetails = {
        from: AUTH_EMAIL,
        to: email,
        subject: "Reset Password Mail",
        html: `
        <div> 
        <h1>Reset Password</h1>
        <h3>Hello ${firstName}</h3>
        <p>Click on the link below to reset your password</p>
        <a href="${ResetLink}">Reset Password</a>
        <p>If you did not request for this, please ignore this email.</p>
        <p>Thanks,</p>
        </div>`
    }

    await transporter.sendMail(mailDetails)
}

module.exports = SendResetPasswordMail;