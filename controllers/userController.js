const bcrypt = require("bcryptjs");

const { initApp } = require("../models/data");
let users;

exports.getAllUsers = async (req, res) => {
  if (!users) users = await initApp();

  res.status(200).json(users);
};

exports.getUserById = async (req, res) => {
  const userId = Number(req.params.id);

  if (!users) users = await initApp();

  const user = users.find((u) => u.id == userId);

  if (!user) res.status(404).json({ message: "User not found" });

  res.json(user);
};

exports.createUser = async (req, res) => {
  if (!users) {
    users = await initApp();
  }

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  try {
    const newUser = {
      ...req.body,
      password: hashedPassword,
      id: users.length + 1,
    };
    users.push(newUser);

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
  }
};

exports.updateUser = (req, res) => {
  try {
    const index = users.findIndex((u) => u.id == req.params.id);

    if (index === -1) res.status(404).json({ message: "User not found" });

    users[index] = { ...users[index], ...req.body };
    res.json(users[index]);
  } catch (error) {
    console.error(error);
  }
};

exports.deleteUser = (req, res) => {
  try {
    const index = users.findIndex((u) => u.id == req.params.id);

    if (index === -1) res.status(404).json({ message: "User not found" });

    users.splice(index, 1);
    res.status(204).send();
  } catch (error) {
    console.error(error);
  }
};
