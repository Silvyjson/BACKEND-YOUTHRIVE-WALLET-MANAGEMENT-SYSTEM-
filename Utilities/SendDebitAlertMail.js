const nodemailer = require("nodemailer");

const AUTH_EMAIL = process.env.EMAIL;
const AUTH_PASSWORD = process.env.PASSWORD;

const SendDebitAlertMail = async (
    email,
    senderFirstName,
    amount,
    date,
    senderAccount_Number,
    receiverFirstName,
    receiverLastName,
    receiverAccount_Number,
    description,
    senderWallet_Balance
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
        subject: "Debit Alert",
        html: `
        <body style="font-family: Arial, sans-serif; margin: 0; padding: 0;">
            <div style="max-width: 600px; margin: 20px auto; background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <h2 style="color: #333; margin-top: 0;">Debit Alert</h2>
                <p style="margin-bottom: 20px;">Dear ${senderFirstName},</p>
                <p style="margin-bottom: 20px;">This is to inform you that an amount of ₦${amount} has been debited from your account.</p>
                <p style="margin-bottom: 20px;">Transaction Details:</p>
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                    <tr style="background-color: #f9f9f9; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                        <td style="padding: 10px; text-align: left; height: 40px;">Date/Time:</td>
                        <td style="padding: 10px; text-align: right; height: 40px;">${date}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; text-align: left; height: 40px;">Type:</td>
                        <td style="padding: 10px; text-align: right; height: 40px;">Debit</td>
                    </tr>
                    <tr style="background-color: #f9f9f9; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                        <td style="padding: 10px; text-align: left; height: 40px;">Account Number:</td>
                        <td style="padding: 10px; text-align: right; height: 40px;">${senderAccount_Number}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; text-align: left; height: 40px;">Receiver's Name:</td>
                        <td style="padding: 10px; text-align: right; height: 40px;">${receiverFirstName} ${receiverLastName}</td>
                    </tr>
                    <tr style="background-color: #f9f9f9; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                        <td style="padding: 10px; text-align: left; height: 40px;">Receiver's Account Number:</td>
                        <td style="padding: 10px; text-align: right; height: 40px;">${receiverAccount_Number}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; text-align: left; height: 40px;">Amount:</td>
                        <td style="padding: 10px; text-align: right; height: 40px;">${amount} DR</td>
                    </tr>
                    <tr style="background-color: #f9f9f9; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                        <td style="padding: 10px; text-align: left; height: 40px;">Description:</td>
                        <td style="padding: 10px; text-align: right; height: 40px;">${description}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; text-align: left; height: 40px;">Wallet Balance:</td>
                        <td style="padding: 10px; text-align: right; height: 40px;">${senderWallet_Balance} DR</td>
                    </tr>
                </table>
                <p style="margin-bottom: 20px;">If you have any questions or concerns, please contact our support team.</p>
                <p style="margin-bottom: 0;">Thank you</p>
            </div>
        </body> `,
    };

    await transporter.sendMail(mailDetails);
};

module.exports = SendDebitAlertMail;
