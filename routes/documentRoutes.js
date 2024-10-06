const express = require("express");
const documentsController = require("../controllers/documentController");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

router.get("/", documentsController.getAllDocuments);
router.get("/:id", documentsController.getDocumentById);
router.post("/", auth, documentsController.createDocument);
router.put("/:id", auth, documentsController.updateDocument);
router.delete("/:id", auth, documentsController.deleteDocument);

module.exports = router;
