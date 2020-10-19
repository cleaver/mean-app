const jwt = require("jsonwebtoken");

const JWT_KEY = process.env.JWT_KEY || "dev-secret--whee!";

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, JWT_KEY);
    next();
  } catch (error) {
    res.status(401).json({ message: "auth failed" });
  }
};
