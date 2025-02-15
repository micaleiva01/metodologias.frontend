import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateUser = ({ onCancel }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    username: "",
  });

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
  
    const formattedData = {
      ...formData,
      id: { id: null },
      validated: false,
      teamName: null,
      unionDate: new Date().toISOString(),
      rol: "PENDING",
    };
  
    try {
      console.log("Submitting user:", formattedData);
  
      const response = await fetch("http://localhost:8000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });
  
      let result = null;
      const text = await response.text();
      if (text) {
        result = JSON.parse(text);
        console.log("Server Response:", result);
      }
  
      if (!response.ok) {
        throw new Error(result?.message || "Error al registrar el usuario");
      }
  
      alert("Usuario registrado con éxito");

      navigate("/login");

    } catch (error) {
      console.error("Registration error:", error.message);
      alert(error.message);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 mb-4 shadow text-white">
          <h2 className="title text-center m-4">Registrar Usuario</h2>
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
