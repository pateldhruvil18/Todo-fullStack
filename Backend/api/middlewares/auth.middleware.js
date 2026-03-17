const jwt = require("jsonwebtoken");
const httpStatus = require("http-status").status;
const User = require("../models/user.schema");
const { buildErrorObject } = require("../utils/buildErrorObject");

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(httpStatus.UNAUTHORIZED).json(buildErrorObject(httpStatus.UNAUTHORIZED, "USER_NOT_FOUND"));
      }

      next();

    } catch (error) {
      return res.status(httpStatus.UNAUTHORIZED).json(buildErrorObject(httpStatus.UNAUTHORIZED, "NOT_AUTHORIZED"));
    }
  }

  if (!token) {
    return res.status(httpStatus.UNAUTHORIZED).json(buildErrorObject(httpStatus.UNAUTHORIZED, "NO_TOKEN_FOUND"));
  }
};

module.exports = protect;
