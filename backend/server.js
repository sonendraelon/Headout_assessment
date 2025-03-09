const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const path = require("path");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Check for production environment
if (process.env.NODE_ENV === "production") {
  console.log("Running in production mode");

  const __dirname1 = path.resolve();
  app.use(express.static(path.join(__dirname1, "/frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname1, "/frontend/build/index.html"));
  });
} else {
  console.log("Running in development mode");
  // You can add development-specific middleware or routes here
}

// Routes
const destinationRoutes = require("./routes/destinations");
const userRoutes = require("./routes/users");
const initializeDataset = require("./utils/initializeDataset");

app.use("/api/destinations", destinationRoutes);
app.use("/api/users", userRoutes);

// Initialize dataset
initializeDataset();

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
