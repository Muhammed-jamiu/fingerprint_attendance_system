require("dotenv").config();
const express = require("express");
const cors = require("cors");

//loading database connection
const connectDB = require("./config/db");

//loading route modules
const authRoutes = require("../server/src/routes/authRoutes");
const studentRoutes = require("../server/src/routes/studentRoutes");
const attendanceRoutes = require("../server/src/routes/attendanceRoutes");
const fingerprintRoutes = require("../server/src/routes/fingerprintRoutes");
const errorHandler = require("../server/src/middlewares/errorMiddleware");

//middleware section
const app = express();

app.use(cors());
app.use(express.json());
app.use(errorHandler);

//loading routes section
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/fingerprint", fingerprintRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
  connectDB();
});
