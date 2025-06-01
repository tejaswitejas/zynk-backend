const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // Load .env variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// basic route
const statusRoutes = require("./routes/statusRoutes");
app.use("/api/status", statusRoutes);

const userRoutes = require("./routes/userRoutes");
app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  res.send("Messenger backend is running 🚀");
});

// Conect backend to MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.log("MongoDB connection error:", err));
