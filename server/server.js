require("dotenv").config(); // Load environment variables
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet"); // Security headers
const morgan = require("morgan"); // Logging
const rateLimit = require("express-rate-limit"); // Prevent brute force attacks
const authRoutes = require("./routes/auth");

const app = express();

// 🔹 Middleware
app.use(express.json()); // Parse JSON requests
app.use(cors()); // Enable CORS
app.use(helmet()); // Secure HTTP headers
app.use(morgan("dev")); // Logging

// 🔹 Rate Limiting (Prevents brute-force attacks)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests, please try again later.",
});
app.use("/api", limiter);

// 🔹 API Routes
app.use("/api", authRoutes);

// 🔹 MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(" MongoDB Connected"))
  .catch((err) => {
    console.error(" MongoDB Connection Error:", err);
    process.exit(1); // Exit if the DB connection fails
  });

// 🔹 Start Express Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
