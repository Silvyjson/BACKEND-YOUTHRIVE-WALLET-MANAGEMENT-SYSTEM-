Wallet API

The Wallet API allows users to register, login, fund their wallet, transfer funds, withdraw funds, and view their transaction history. This documentation provides a brief overview of the API.

Table of Contents

- [Installation](installation)
- [Usage](usage)
- [API Endpoints](api-endpoints)
- [Models](models)
- [Scheduled Tasks](scheduled-tasks)

Installation

1. Clone the repository: `git clone https://github.com/Silvyjson/BACKEND-YOUTHRIVE-WALLET-MANAGEMENT-SYSTEM-.git`

2. Install dependencies: `npm install`

3. Set up environment variables:

   Create a `.env` file in the root directory and add the following:

   `PORT= your-port
JWT_TOKEN=your_jwt_secret
MONGO_URI=your_mongodb_connection_string
EMAIL= your email service for sending emials
PASSWORD=your password`

5. Start the server: `npm run dev`

Usage

The API provides various endpoints to manage user accounts and transactions. Below is a summary of the available endpoints.

API Endpoints

User Authentication

- Register: `/register` (POST) - Registers a new user.
- Login: `/login` (POST) - Authenticates a user and returns a JWT token.
- Forgot Password: `/forgotPassword` (POST) - Sends a password reset link.
- Reset Password: `/resetPassword` (POST) - Resets the user's password.
- Edit user: `/editUser/:id` (PATCH) - Updates the user information.
- Delete user: `/deleteUser/:id` (DELETE) - Deletes the user.

Transactions

- Add Funds: `/addFunds` (POST) - Adds funds to the user's wallet from an external account.
- Transfer Funds: `/transferFunds` (POST) - Transfers funds between users within the system.
- Withdraw Funds: `/withdrawFunds` (POST) - Withdraws funds from the user's wallet.

Transaction History

- Get Transaction History: `/transactionHistory` (GET) - Retrieves the transaction history of the authenticated user.

Models

User

The user model includes fields for first name, last name, email, password, phone number, address, date of birth, role, verification status, wallet balance, registration time, and a unique account number.

Transaction

The transaction model includes fields for sender, receiver, transaction type (credit or debit), amount, date, description, and time.

Scheduled Tasks

Delete Unverified Users

A scheduled task runs every hour to delete users who have not verified their accounts within one hour of registration.

Contribution

Feel free to fork this repository and contribute by submitting a pull request.

License

This project is licensed under the MIT License.
