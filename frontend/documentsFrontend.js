import React, { useEffect, useState } from "react";

const API_DOCUMENTS_URL = "http://localhost:4000/documents";

const DocumentManager = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newDocument, setNewDocument] = useState({
    name: "",
    status: "",
    userId: "",
  });
  const [selectedDocument, setSelectedDocument] = useState(null);

  const fetchDocuments = async () => {
    try {
      const response = await fetch(`${API_DOCUMENTS_URL}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer <token_jwt>",
        },
      });
      const data = await response.json();
      setDocuments(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching documents:", error);
      setLoading(false);
    }
  };

  const createDocument = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_DOCUMENTS_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "applications/json",
          Authorization: "Bearer <token_jwt>",
        },
        body: JSON.stringify(newDocument),
      });
      const data = await response.json();
      setDocuments([...documents, data]);
      setNewDocument({ name: "", status: "", userId: "" });
    } catch (error) {
      console.error("Error creating document:", error);
    }
  };

  const updateDocument = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${API_DOCUMENTS_URL}/${selectedDocument.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer <token_jwt>",
          },
          body: JSON.stringify(selectedDocument),
        }
      );
      const data = await response.json();
      setDocuments(documents.map((doc) => (doc.id === data.id ? data : doc)));
      setSelectedDocument(null);
    } catch (error) {}
  };

  const deleteDocument = async (documentId) => {
    try {
      await fetch(`${API_DOCUMENTS_URL}/${documentId}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer <token_jwt>",
        },
      });
      setDocuments(documents.filter((doc) => doc.id !== documentId));
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Document List</h1>
      <ul>
        {documents.map((doc) => {
          <li key={doc.id}>
            {doc.name} (Status: {doc.status}) - User ID: {doc.userId}
            <button onClick={() => setSelectedDocument(doc)}>Edit</button>
            <button onClick={() => deleteDocument(doc.id)}>Delete</button>
          </li>;
        })}
      </ul>

      <h2>{selectedDocument ? "Update Document" : "Create new Document"}</h2>
      <form onSubmit={selectedDocument ? updateDocument : createDocument}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={selectedDocument ? selectedDocument.name : newDocument.name}
            onChange={(e) => {
              if (selectedDocument) {
                setSelectedDocument({
                  ...selectedDocument,
                  name: e.target.value,
                });
              } else {
                setNewDocument({ ...newDocument, name: e.target.value });
              }
            }}
            required
          />
        </div>
        <div>
          <label>Status:</label>
          <input
            type="text"
            value={
              selectedDocument ? selectedDocument.status : newDocument.status
            }
            onChange={(e) => {
              if (selectedDocument) {
                setSelectedDocument({
                  ...selectedDocument,
                  status: e.target.value,
                });
              } else {
                setNewDocument({ ...newDocument, status: e.target.value });
              }
            }}
          />
        </div>
        <div>
          <label>User ID:</label>
          <input
            type="number"
            value={
              selectedDocument ? selectedDocument.userId : newDocument.userId
            }
            onChange={(e) => {
              if (selectedDocument) {
                setSelectedDocument({
                  ...selectedDocument,
                  userId: e.target.value,
                });
              } else {
                setNewDocument({ ...newDocument, userId: e.target.value });
              }
            }}
            required
          />
        </div>
        <button type="submit">
          {selectedDocument ? "Update Document" : "Create Document"}
        </button>
      </form>
    </div>
  );
};

export default DocumentManager;
