const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/User");
require("dotenv").config();

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header("Authorization");
  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    // Split the token to get the actual JWT token
    const actualToken = token.split(" ")[1];
    const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
