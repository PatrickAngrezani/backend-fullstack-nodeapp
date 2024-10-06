import React, { useEffect, useState } from "react";

const API_USERS_URL = "http://localhost:4000/users";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "" });
  const [userIdToFetch, setUserIdToFetch] = useState("");
  const [fetchedUser, setFetchedUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_USERS_URL}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer <token_jwt>",
        },
      });
      const data = await response.json();
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  const fetchUserById = async (userId) => {
    try {
      const response = await fetch(`${API_USERS_URL}/${userId}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer <token_jwt>",
        },
      });

      const data = await response.json();
      console.log("User fetched:", data);
      return data;
    } catch (error) {
      console.error("Error fetching user by ID:", error);
    }
  };

  const createUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_USERS_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer <seu_token_jwt>",
        },
        body: JSON.stringify(newUser),
      });
      const data = await response.json();
      console.log("User created:", data);
      fetchUsers();
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const updateUser = async (userId, updatedUserData) => {
    try {
      const response = await fetch(`${API_USERS_URL}/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer <token_jwt>",
        },
        body: JSON.stringify(updatedUserData),
      });

      const data = await response.json();
      console.log("User updated:", data);
      fetchUsers();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      const response = await fetch(`${API_USERS_URL}/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer <token_jwt>",
        },
      });

      if (response.status === 204) {
        console.log("User deleted successfully");
        fetchUsers();
      } else {
        console.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleFetchUser = async (e) => {
    e.preventDefault();
    const userData = await fetchUserById(userIdToFetch);
    setFetchedUser(userData);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email})
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h2>Create New User</h2>
      <form onSubmit={createUser}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={newUser.password}
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
            required
          />
        </div>
        <button type="submit">Create User</button>
      </form>

      <h2>Update User</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateUser(selectedUserId, {
            name: updatedName,
            email: updatedEmail,
          });
        }}
      >
        <div>
          <label>User ID:</label>
          <input
            type="number"
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Name:</label>
          <input
            type="email"
            value={updatedEmaio}
            onChange={(e) => setUpdatedEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update User</button>
      </form>

      <div>
        <h2>Fetch User by ID</h2>
        <form onSubmit={handleFetchUser}>
          <div>
            <label>User ID:</label>
            <input
              type="text"
              value={userIdToFetch}
              onChange={(e) => setUserIdToFetch(e.target.value)}
              required
            />
          </div>
          <button type="submit">Fetch User</button>
        </form>

        {fetchedUser && (
          <div>
            <h3>Fetched User:</h3>
            <p>Name: {fetchedUser.name}</p>
            <p>Email: {fetchedUser.email}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;
