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
        <body style="font-family: Arial, sans-serif; margin: 0; padding: 0;">
            <div style="max-width: 600px; margin: 20px auto; background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h1>Reset Password</h1>
            <h3>Hello ${firstName}</h3>
            <p>Click on the link below to reset your password</p>
            <a href="${ResetLink}">Reset Password</a>
            <p>If you did not request for this, please ignore this email.</p>
            <p>Thanks</p>
            </div>
        </body>`
    }

    await transporter.sendMail(mailDetails)
}

module.exports = SendResetPasswordMail;