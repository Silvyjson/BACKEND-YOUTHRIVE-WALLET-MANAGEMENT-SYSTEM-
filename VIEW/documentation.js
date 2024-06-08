function formatJson(json) {
  return JSON.stringify(json, null, 2)
}

// still working on this as well

const Documentation = 
`  
<div>
<h1>Wallet API Documentation</h1>
<p>
  The Wallet API allows users to register, login, fund their wallet,
  withdraw funds, and view their transaction history. This documentation
  provides detailed information on how to interact with the API.
</p>
<h3>Endpoints</h3>
<div>
  <h3>Register:</h3>
  <i><b>URL:</b> /register</i>
  <i><b>Method:</b> POST</i>
  <p><b>Request Body:</b></p>
  <pre style="
        background-color: #000;
        color: #fff;
        padding: 20px;
        border-radius: 20px;
      ">
${formatJson({
  firstName: "string",
  lastName: "string",
  email: "string",
  password: "string",
})}</pre>
  <p><b>Response:</b> success: '201 created'</p>
  <pre style="
        background-color: #000;
        color: #fff;
        padding: 20px;
        border-radius: 20px;
      ">
${formatJson({
  message: "User registered successfully",
})}</pre>
</div>
<div>
  <h3>Login:</h3>
  <i><b>URL:</b> /Login</i>
  <i><b>Method:</b> POST</i>
  <p><b>Request Body:</b></p>
  <pre style="
        background-color: #000;
        color: #fff;
        padding: 20px;
        border-radius: 20px;
      ">
${formatJson({
  email: "string",
  password: "string",
})}</pre>
  <p><b>Response:</b> success: '200 created'</p>
  <pre style="
        background-color: #000;
        color: #fff;
        padding: 20px;
        border-radius: 20px;
      ">
${formatJson({
  message: "Login successful",
})}</pre>
</div>
<div>
  <h3>LogOut:</h3>
  <i><b>URL:</b> /LogOut</i>
  <i><b>Method:</b> POST</i>
  <p><b>Request Body:</b></p>
  <pre style="
        background-color: #000;
        color: #fff;
        padding: 20px;
        border-radius: 20px;
      ">
${formatJson({
  email: "string",
  password: "string",
})}</pre>
  <p><b>Response:</b> success: '200 created'</p>
  <pre style="
        background-color: #000;
        color: #fff;
        padding: 20px;
        border-radius: 20px;
      ">
${formatJson({
  message: "User logout successful",
})}</pre>
</div>
<h3>Edit user:</h3>
<i><b>URL:</b> /editUser</i>
<i><b>Method:</b> POST</i>
<p><b>Request Body:</b></p>
<pre style="
      background-color: #000;
      color: #fff;
      padding: 20px;
      border-radius: 20px;
    ">
${formatJson({
  firstName: "string",
  lastName: "string",
  email: "string",
  password: "string",
})}</pre>
<p><b>Response:</b> success: '200 created'</p>
<pre style="
      background-color: #000;
      color: #fff;
      padding: 20px;
      border-radius: 20px;
    ">
${formatJson({
  message: "changes saved",
})}</pre>
</div> 
`;

module.exports = Documentation;
