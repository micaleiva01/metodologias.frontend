import React, { useState } from "react";

const CreateUser = ({ onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    username: "",
    role: "Administrador",
  });

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error al registrar el usuario");
      }

      alert("Usuario registrado con éxito");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 mb-4 shadow text-white">
          <h2 className="text-center m-4">Registrar Usuario</h2>
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Nombre:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Introduce tu nombre"
                name="name"
                value={formData.name}
                onChange={onInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Correo Electrónico:
              </label>
              <input
                type="email"
                className="form-control"
                placeholder="Introduce tu correo electrónico"
                name="email"
                value={formData.email}
                onChange={onInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Contraseña:
              </label>
              <input
                type="password"
                className="form-control"
                placeholder="Introduce tu contraseña"
                name="password"
                value={formData.password}
                onChange={onInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Nombre de Usuario:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Introduce tu nombre de usuario"
                name="username"
                value={formData.username}
                onChange={onInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="role" className="form-label">
                Rol:
              </label>
              <select
                className="form-control"
                name="role"
                value={formData.role}
                onChange={onInputChange}
                required
              >
                <option value="Administrador">Administrador</option>
                <option value="Responsable de equipo">
                  Responsable de equipo
                </option>
              </select>
            </div>
            <button type="submit" className="btn btn-outline-danger">
              Registrar
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary ms-2"
              onClick={onCancel}
            >
              Cancelar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;