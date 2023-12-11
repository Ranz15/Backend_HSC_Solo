const jwt = require("jsonwebtoken");

const verifyJWT = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];

    if (!token) {
      return res.status(400).json({
        message: "Token Empty",
      });
    }

    const verify = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);

    if (!verify) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    req.userID = verify;

    next();
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = verifyJWT;
