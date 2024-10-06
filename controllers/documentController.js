const { initApp } = require("../models/data");
const { documents } = require("../models/data");
let users;

exports.getAllDocuments = (req, res) => {
  res.json(documents);
};

exports.getDocumentById = (req, res) => {
  const doc = documents.find((d) => d.id == req.params.id);

  if (!doc) res.status(404).json({ message: "Document not found" });

  res.json(doc);
};

exports.createDocument = async (req, res) => {
  if (!users) users = await initApp();

  try {
    const user = users.find((u) => u.id === parseInt(req.body.userId, 10));
    if (!user) return res.status(404).json({ message: "User not found" });
    console.log({ users });

    const newDocument = { ...req.body, id: documents.length + 1 };

    documents.push(newDocument);
    user.documents.push(newDocument);

    res.status(201).json(newDocument);
  } catch (error) {
    console.error(error);
  }
};

exports.updateDocument = (req, res) => {
  try {
    const index = documents.findIndex((d) => d.id == req.params.id);

    if (index === -1) res.status(404).json({ message: "Document not found" });

    documents[index] = { ...documents[index], ...req.body };
    res.json(documents[index]);
  } catch (error) {
    console.error(error);
  }
};

exports.deleteDocument = (req, res) => {
  try {
    const index = documents.findIndex((d) => d.id == req.params.id);

    if (index === -1) res.status(404).json({ message: "Document not found" });

    documents.splice(index, 1);
    res.status(204).send();
  } catch (error) {
    console.error(error);
  }
};
