require("dotenv").config({ path: "../.env" });

const jwt = require("jsonwebtoken");

const secretKey = process.env.SECRET_KEY;

module.exports = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), `${secretKey}`);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token." });
  }
};
