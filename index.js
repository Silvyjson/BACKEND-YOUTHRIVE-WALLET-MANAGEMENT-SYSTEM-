const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const AuthRoutes = require("./Routes/AuthRoutes");
const TransacRoutes = require("./Routes/TransactionRoutes");
const Documentation = require("./VIEW/documentation");

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8080;
const MONGODB_URL = process.env.MONGODB_URL;

mongoose.connect(MONGODB_URL)
  .then(() => console.log("MongoDB connected successfully"))
  .catch(() => console.log("Failed to connect to MongoDB"));
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send(Documentation);
});

app.use("/api/", AuthRoutes);
app.use("/api/", TransacRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: "Page not found",
  });
});
