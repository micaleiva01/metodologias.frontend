import React, { useEffect, useState } from "react";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUserEmail, setEditingUserEmail] = useState(null);
  const [editedUser, setEditedUser] = useState({ name: "", email: "" });
  const [roleSelections, setRoleSelections] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true); 
      try {
        const response = await fetch("http://localhost:8000/users", { 
          method: "GET",
          headers: { "Content-Type": "application/json" }
        });

        if (!response.ok) {
          throw new Error("Error al cargar usuarios");
        }

        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); 
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    console.log("Editing User:", user);
    setEditingUserEmail(user.email);
    setEditedUser({ name: user.name, email: user.email });
  };

  const handleSave = async () => {
    if (!editingUserEmail) {
      alert("Error: No user selected for editing");
      return;
    }
  
    const userToUpdate = users.find((user) => user.email === editingUserEmail);
    if (!userToUpdate) {
      alert("Error: User not found in state");
      return;
    }
  
    const updatedUser = {
      ...userToUpdate,
      name: editedUser.name,
      email: editingUserEmail,
    };
  
    try {
      console.log("Updating User:", JSON.stringify(updatedUser, null, 2));
  
      const response = await fetch(`http://localhost:8000/users/${editingUserEmail}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });
  
      const result = await response.text();
      console.log("Server Response:", result);
  
      if (!response.ok) {
        throw new Error(result || "Error al editar usuario");
      }
  
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.email === editingUserEmail ? { ...user, ...updatedUser } : user
        )
      );
  
      setEditingUserEmail(null);
    } catch (err) {
      console.error("Edit Error:", err.message);
      alert(err.message);
    }
  };
  
  

  const handleDelete = async (userEmail) => {
    try {
      const response = await fetch(`http://localhost:8000/users/${userEmail}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error al eliminar usuario");
      }

      setUsers((prevUsers) => prevUsers.filter((user) => user.email !== userEmail));
    } catch (err) {
      alert(err.message);
    }
  };

  const approveUser = async (user) => {
    console.log("Approving User Email:", user.email);

    const selectedRole = roleSelections[user.email];
    if (!selectedRole) {
      alert("Por favor, selecciona un rol antes de aprobar.");
      return;
    }

    try {
      const updatedUser = { 
        ...user, 
        validated: true, 
        rol: selectedRole
      };

      const response = await fetch(`http://localhost:8000/users/${user.email}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });

      if (!response.ok) {
        throw new Error("Error al aprobar usuario");
      }

      alert(`Usuario ${user.name} aprobado como ${selectedRole} con éxito.`);
      
      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u.email === user.email ? { ...u, validated: true, rol: selectedRole } : u
        )
      );
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p>Cargando usuarios...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 m-4">
      <div className="user-list text-white text-center w-75 p-4 rounded shadow-lg">
        <h1 className="mb-4 title">USUARIOS</h1>
        {users.length === 0 ? (
          <p className="fs-5">No se han encontrado usuarios disponibles</p>
        ) : (
          <ul className="list-unstyled">
            {users.map((user) => {
              console.log("User ID:", user.id);

              return (
                <li key={user.email} className="mb-3 p-3 rounded">
                  {editingUserEmail === user.email ? (
                    <div>
                      <input
                        type="text"
                        className="form-control mb-2"
                        value={editedUser.name}
                        onChange={(e) =>
                          setEditedUser((prev) => ({ ...prev, name: e.target.value }))
                        }
                        placeholder="Name"
                      />
                      <input
                        type="email"
                        className="form-control mb-2"
                        value={editedUser.email}
                        onChange={(e) =>
                          setEditedUser((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        placeholder="Email"
                      />
                      <button onClick={handleSave} className="btn btn-primary me-2">
                        Guardar
                      </button>
                      <button onClick={() => setEditingUserEmail(null)} className="btn btn-secondary">
                        Cancelar
                      </button>
                    </div>
                  ) : (
                    <div className="p-3 rounded shadow-sm border border-light">
                      <p className="mb-1"><strong>Nombre:</strong> {user.name}</p>
                      <p className="mb-2"><strong>Correo Electrónico:</strong> {user.email}</p>

                      {!user.validated && (
                        <div className="d-flex align-items-center justify-content-center">
                        {/* ✅ Role Dropdown */}
                        <select 
                          className="form-select w-auto me-2" 
                          value={roleSelections[user.email] || ""}
                          onChange={(e) => 
                            setRoleSelections((prev) => ({ ...prev, [user.email]: e.target.value }))
                          }
                        >
                          <option value="" disabled>Seleccionar rol</option>
                          <option value="ADMIN">Administrador</option>
                          <option value="TEAM_MANAGER">Responsable de equipo</option>
                        </select>

                        <button onClick={() => approveUser(user)} className="btn btn-success m-1">
                          Aprobar
                        </button>
                        </div>
                      )}

                      <button onClick={() => handleEdit(user)} className="btn btn-warning m-1">
                        Editar
                      </button>
                      <button onClick={() => handleDelete(user.email)} className="btn btn-danger m-1">
                        Eliminar
                      </button>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserList;
