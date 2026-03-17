require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const httpStatus = require("http-status").status;

const connectDB = require("./config/mongo");
const startup = require("./config/startup");
const logger = require("./config/logger");

const apiRoutes = require("./api/routes");

connectDB();

const app = express();

// Security Middlewares
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

// 404 handler
app.use((req, res) => {
  res.status(httpStatus.NOT_FOUND).json({
    code: httpStatus.NOT_FOUND,
    message: "Route not found",
  });
});

app.listen(5000, () => {
  startup();
});