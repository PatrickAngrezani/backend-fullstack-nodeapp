const bcrypt = require("bcryptjs");

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
};

const createUsers = async () => {
  let users = [
    {
      id: 1,
      name: "Patrick Angrezani",
      email: "pangrezani@gmail.com",
      password: await hashPassword("12345678"),
      documents: [1, 2],
    },
    {
      id: 2,
      name: "User 2",
      email: "user2@gmail.com",
      password: await hashPassword("87654321"),
      documents: [3, 4],
    },
  ];

  return users;
};

let documents = [
  { id: 1, name: "Document 1", status: "pending", userId: 1 },
  { id: 2, name: "Document 2", status: "completed", userId: 1 },
  { id: 3, name: "Document 3", status: "pending", userId: 2 },
  { id: 4, name: "Document 4", status: "completed", userId: 2 },
];

const initApp = async () => {
  const users = await createUsers();
  return users;
};

module.exports = { documents, initApp };
