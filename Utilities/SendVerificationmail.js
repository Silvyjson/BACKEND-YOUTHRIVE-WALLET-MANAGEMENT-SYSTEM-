const nodemailer = require("nodemailer");

const AUTHEMAIL = process.env.EMAIL;
const AUTHPASSWORD = process.env.PASSWORD;

const SendVerificationMail = async (email, firstName, verificationLink) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: AUTHEMAIL,
      pass: AUTHPASSWORD,
    },
  });

  const mailDetails = {
    from: AUTHEMAIL,
    to: email,
    subject: "Verification Mail",
    html: `
    <body style="font-family: Arial, sans-serif; margin: 0; padding: 0;">
      <div style="max-width: 600px; margin: 20px auto; background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h3>Welcome ${firstName}</h3>
          <p>Thank you for registering with us. Please verify your email address by clicking on the link below.</p>
          <a href="${verificationLink}">Verify Email</a>
          <p>If you did not register with us, please ignore this email.</p>
          <p>Thanks,</p>
          <p>The Team</p>
      </div>
    </body>`
  };

  await transporter.sendMail(mailDetails);
};

module.exports = SendVerificationMail;
