require("dotenv").config();

const express = require("express");
const userRouter = require("./routes/userRoutes");
const documentController = require("./routes/documentRoutes");
const authController = require("./routes/authRoutes");

const port = process.env.PORT;

const app = express();
app.use(express.json());

app.use("/users", userRouter);
app.use("/documents", documentController);
app.use("/login", authController);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
