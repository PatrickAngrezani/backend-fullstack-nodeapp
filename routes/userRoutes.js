const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post("/", auth, userController.createUser);
router.put("/:id", auth, userController.updateUser);
router.delete("/:id", auth, userController.deleteUser);

module.exports = router;
