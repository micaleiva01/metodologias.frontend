import React, { useEffect, useState } from "react";

const ManageTeamUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //const user = JSON.parse(localStorage.getItem("user"));
  const loggedInUser = JSON.parse(localStorage.getItem("user"));


  useEffect(() => {
    const fetchUsers = async () => {
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



  const assignUserToTeam = async (user) => {
    if (!user) {
        console.error("Error");
        alert("Error: No se puede asignar un usuario sin información.");
        return;
    }

    if (!user.validated) {
        alert("No puedes asignar un usuario que aún no ha sido validado.");
        return;
    }

    try {
        const updatedUser = { 
            ...user, 
            teamName: loggedInUser.teamName
        };

        console.log("Asignando usuario al equipo:", updatedUser);

        const response = await fetch(`http://localhost:8000/users/${user.email}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedUser),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || "Error al asignar usuario al equipo");
        }

        alert(`Usuario ${user.name} asignado al equipo ${loggedInUser.teamName} con éxito.`);

        setUsers((prevUsers) =>
            prevUsers.map((u) =>
                u.email === user.email ? { ...u, teamName: loggedInUser.teamName } : u
            )
        );
    } catch (err) {
        console.error("Error:", err.message);
        alert(err.message);
    }
  };

  

  if (loading) return <p>Cargando usuarios...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 m-4">
      <div className="user-list text-white text-center w-75 p-4 rounded shadow-lg">
        <h1 className="mb-4 title">Gestionar Usuarios</h1>
        {users.length === 0 ? (
          <p className="fs-5">No se han encontrado usuarios disponibles</p>
        ) : (
          <ul className="list-unstyled">
            {users
              .filter((u) => !u.teamName)
              .map((user) => (
                <li key={user.email} className="mb-3 p-3 rounded">
                  <div className="p-3 rounded shadow-sm border border-light">
                    <p className="mb-1"><strong>Nombre:</strong> {user.name}</p>
                    <p className="mb-2"><strong>Correo Electrónico:</strong> {user.email}</p>

                    <button
                        onClick={() => assignUserToTeam(user.email)}
                        className="btn btn-primary m-1"
                        disabled={!user.validated}
                    >
                        Asignar a equipo
                    </button>

                  </div>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ManageTeamUsers;
