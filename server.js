const express = require("express");
const dotenv = require("dotenv").config();
const errorHandler = require("./middleware/errorHandler");
const connectToMongoDB = require("./config/mongoConnection");
const apiRequestRoute = require("./routes/apiRequestRoute");
const contactRoutes = require("./routes/contactRoutes");
const userRoutes = require("./routes/userRoutes");
const validateToken = require("./middleware/validateTokenhandler");

const PORT = process.env.PORT || 5001;
const app = express();

app.use(express.json());

// MongoDB Connection
(async () => {
  const mongoConnected = await connectToMongoDB();
  if (!mongoConnected) {
    console.error("Failed to connect to MongoDB. Exiting...");
    process.exit(1);
  }
})();

// Routes maping
app.use("/api/getToken", apiRequestRoute);

// Apply middleware to all subsequent routes
app.use(validateToken);
app.use("/api/contacts", contactRoutes);
app.use("/api/users", userRoutes);


// Catch-all route for undefined routes
app.use((req, res, next) => {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  res.status(404);
  next(error);
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

module.exports = app;
