const VerificationMail = (firstName, verificationLink) => {
  return `
  <body style="font-family: Arial, sans-serif; margin: 0; padding: 0;">
    <div style="max-width: 600px; margin: 20px auto; background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <h3>Welcome ${firstName}</h3>
        <p>Thank you for registering with us. Please verify your email address by clicking on the link below.</p>
        <a href="${verificationLink}">Verify Email</a>
        <p>If you did not register with us, please ignore this email.</p>
        <p>Thanks,</p>
        <p>The Team</p>
    </div>
  </body>`;
};

const ResetPasswordMail = (firstName, ResetLink) => {
  return `
  <body style="font-family: Arial, sans-serif; margin: 0; padding: 0;">
    <div style="max-width: 600px; margin: 20px auto; background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
      <h1>Reset Password</h1>
      <h3>Hello ${firstName}</h3>
      <p>Click on the link below to reset your password</p>
      <a href="${ResetLink}">Reset Password</a>
      <p>If you did not request this, please ignore this email.</p>
      <p>Thanks</p>
    </div>
  </body>`;
};

const CreditAlertMail = (
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
  return `
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
        ${
          senderFirstName && senderLastName
            ? `<tr>
                <td style="padding: 10px; text-align: left; height: 40px;">Sender's Name:</td>
                <td style="padding: 10px; text-align: right; height: 40px;">${senderFirstName} ${senderLastName}</td>
              </tr>`
            : ""
        }
        ${
          senderAccount_Number
            ? `<tr style="background-color: #f9f9f9; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <td style="padding: 10px; text-align: left; height: 40px;">Sender's Account Number:</td>
                <td style="padding: 10px; text-align: right; height: 40px;">${senderAccount_Number}</td>
              </tr>`
            : ""
        }
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
  </body>`;
};

const DebitAlertMail = (
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
  return `
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
        ${
          receiverFirstName && receiverLastName
            ? `<tr>
                <td style="padding: 10px; text-align: left; height: 40px;">Receiver's Name:</td>
                <td style="padding: 10px; text-align: right; height: 40px;">${receiverFirstName} ${receiverLastName}</td>
              </tr>`
            : ""
        }
        ${
          receiverAccount_Number
            ? `<tr style="background-color: #f9f9f9; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <td style="padding: 10px; text-align: left; height: 40px;">Receiver's Account Number:</td>
                <td style="padding: 10px; text-align: right; height: 40px;">${receiverAccount_Number}</td>
              </tr>`
            : ""
        }
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
  </body>`;
};

module.exports = {
  VerificationMail,
  ResetPasswordMail,
  CreditAlertMail,
  DebitAlertMail,
};
