const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const registrationRoutes = require("./routes/registrationRoutes");
const exportRoutes = require("./routes/exportRoutes");

dotenv.config();

const connectDB = require("./config/db");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/export", exportRoutes);
app.use("/api/registrations", registrationRoutes);
app.get("/", (req, res) => {
  res.json({
    message: "Football Backend API Running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});