const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { initApp } = require("../models/data");

let users;

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!users) {
    users = await initApp();
  }

  const user = users.find((u) => u.email == email);

  if (!user) return res.status(400).json({ message: "User not found" });

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword)
    return res.status(400).json({ message: "Invalid password" });

  const token = jwt.sign({ id: user.id, email: user.email }, "secret-key", {
    expiresIn: "5min",
  });

  res.json({ token });
};
