const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Routes
const destinationRoutes = require("./routes/destinations");
const userRoutes = require("./routes/users");
const initializeDataset = require("./utils/initializeDataset");

app.use("/api/destinations", destinationRoutes);
app.use("/api/users", userRoutes);

// Initialize dataset
initializeDataset();

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
