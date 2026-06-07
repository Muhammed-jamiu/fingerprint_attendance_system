require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

//loading database connection
const connectDB = require("../server/src/config/db");

//loading route modules
const authRoutes = require("../server/src/routes/authRoutes");
const studentRoutes = require("../server/src/routes/studentRoutes");
const fingerprintRoutes = require("../server/src/routes/fingerprintRoutes");
const errorHandler = require("../server/src/middlewares/errorMiddleware");
const attendanceRoutes = require("../server/src/routes/attendanceRoutes");
//middleware section
const app = express();

app.use(express.json());
// global error handler
app.use(errorHandler);
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
  // cors({
  //   origin: "http://127.0.0.1:5500",
  //   credentials: true,
  // }),
);
app.use("/public", express.static(path.join(__dirname, "public")));

//loading routes section
app.use("/api/auth", authRoutes);

app.use("/api/fingerprint", fingerprintRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/attendance", attendanceRoutes);

const PORT = process.env.PORT || 5000;

//database connection and server start
connectDB();
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
