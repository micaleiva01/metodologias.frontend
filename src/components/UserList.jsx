import React, { useEffect, useState } from "react";


const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedUser, setEditedUser] = useState({ name: "", email: "" });


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        if (!response.ok) {
          throw new Error("Error al cargar usuarios");
        }
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setEditingUserId(user.id);
    setEditedUser({ name: user.name, email: user.email });
  };

  const handleSave = async (userId) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedUser),
      });

      if (!response.ok) {
        throw new Error("Error al editar usuario");
      }

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, ...editedUser } : user
        )
      );

      setEditingUserId(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (userId) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error al eliminar usuario");
      }

      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Cargando usuarios...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="user-list">
      <h1>USUARIOS</h1>
      {users.length === 0 ? (
        <p>No se han encontrado usuarios disponibles</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {editingUserId === user.id ? (
                <div>
                  <input
                    type="text"
                    value={editedUser.name}
                    onChange={(e) =>
                      setEditedUser((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder="Name"
                  />
                  <input
                    type="email"
                    value={editedUser.email}
                    onChange={(e) =>
                      setEditedUser((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    placeholder="Email"
                  />
                  <button onClick={() => handleSave(user.id)}>Guardar</button>
                  <button onClick={() => setEditingUserId(null)}>Cancelar</button>
                </div>
              ) : (
                <div>
                  <strong>Nombre:</strong> {user.name} <br />
                  <strong>Correo electronico:</strong> {user.email} <br />
                  <button onClick={() => handleEdit(user)}>Editar</button>
                  <button onClick={() => handleDelete(user.id)}>Eliminar</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;