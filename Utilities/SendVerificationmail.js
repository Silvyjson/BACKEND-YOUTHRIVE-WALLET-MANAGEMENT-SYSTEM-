const nodemailer = require("nodemailer");

const AUTHEMAIL = process.env.EMAIL;
const AUTHPASSWORD = process.env.PASSWORD;

const SendVerificationmail = async (email, firstName, verificationLink) => {
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
      <div>
            <h3>Welcome ${firstName}</h3>
            <p>Thank you for registering with us. Please verify your email address by clicking on the link below.</p>
            <a href="${verificationLink}">Verify Email</a>
            <p>If you did not register with us, please ignore this email.</p>
            <p>Thanks,</p>
            <p>The Team</p>
     </div>
      `,
  };

  await transporter.sendMail(mailDetails);
};

module.exports = SendVerificationmail;
