const jwt = require("jsonwebtoken");
const config = require("../config");

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header("auth-token");

  // Check if not token
  if (!token) {
    return res.status(401).json({
      data: "null",
      message: "No token, authorization denied",
      statusCode: 403,
    });
  }

  // Verify token
  try {
    jwt.verify(token, config.jwt, (error, decoded) => {
      if (error) {
        return res.status(401).json({
          data: "null",
          message: "Token is not valid",
          statusCode: 401,
        });
      } else {
        req.user = decoded.user;
        req.role = decoded.role;
        next();
      }
    });
  } catch (err) {
    console.error("something wrong with auth middleware");
    res.status(500).json({ message: "Server Error" });
  }
};
