const nodemailer = require("nodemailer");

const AUTH_EMAIL = process.env.EMAIL;
const AUTH_PASSWORD = process.env.PASSWORD;

const SendCreditAlertMail = async (
  email,
  receiverFirstName,
  amount,
  date,
  receiverAccount_Number,
  senderFirstName,
  senderLastName,
  senderAccount_Number,
  description,
  receiverWallet_Balance
) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: AUTH_EMAIL,
      pass: AUTH_PASSWORD,
    },
  });

  const mailDetails = {
    from: AUTH_EMAIL,
    to: email,
    subject: "Credit Alert",
    html: `
    <body style="font-family: Arial, sans-serif; margin: 0; padding: 0;">
        <div style="max-width: 600px; margin: 20px auto; background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #333; margin-top: 0;">Credit Alert</h2>
            <p style="margin-bottom: 20px;">Dear ${receiverFirstName},</p>
            <p style="margin-bottom: 20px;">This is to inform you that an amount of ₦${amount} has been credited to your account.</p>
            <p style="margin-bottom: 20px;">Transaction Details:</p>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <tr style="background-color: #f9f9f9; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <td style="padding: 10px; text-align: left; height: 40px;">Date/Time:</td>
                    <td style="padding: 10px; text-align: right; height: 40px;">${date}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; text-align: left; height: 40px;">Type:</td>
                    <td style="padding: 10px; text-align: right; height: 40px;">Credit</td>
                </tr>
                <tr style="background-color: #f9f9f9; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <td style="padding: 10px; text-align: left; height: 40px;">Account Number:</td>
                    <td style="padding: 10px; text-align: right; height: 40px;">${receiverAccount_Number}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; text-align: left; height: 40px;">Sender's Name:</td>
                    <td style="padding: 10px; text-align: right; height: 40px;">${senderFirstName} ${senderLastName}</td>
                </tr>
                <tr style="background-color: #f9f9f9; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <td style="padding: 10px; text-align: left; height: 40px;">Sender's Account Number:</td>
                    <td style="padding: 10px; text-align: right; height: 40px;">${senderAccount_Number}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; text-align: left; height: 40px;">Amount:</td>
                    <td style="padding: 10px; text-align: right; height: 40px;">${amount} CR</td>
                </tr>
                <tr style="background-color: #f9f9f9; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <td style="padding: 10px; text-align: left; height: 40px;">Description:</td>
                    <td style="padding: 10px; text-align: right; height: 40px;">${description}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; text-align: left; height: 40px;">Wallet Balance:</td>
                    <td style="padding: 10px; text-align: right; height: 40px;">${receiverWallet_Balance} CR</td>
                </tr>
            </table>
            <p style="margin-bottom: 20px;">If you have any questions or concerns, please contact our support team.</p>
            <p style="margin-bottom: 0;">Thank you</p>
        </div>
    </body> `,
  };

  await transporter.sendMail(mailDetails);
};

module.exports = SendCreditAlertMail;
