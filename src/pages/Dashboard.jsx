import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No estás autenticado");
        }

        const response = await fetch("/api/auth/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("No se pudo obtener la información del usuario");
        }

        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
        localStorage.removeItem("token");
        navigate("/login");
      }
    };


    fetchUserData();
  }, [navigate]);


  if (error) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8 offset-md-2 border rounded p-4 shadow">
          <h1 className="text-center mb-4">Bienvenido, {user.name}!</h1>
          <h5 className="text-center mb-3">Selecciona una opción:</h5>
          <ul className="list-group">
            <li
              className="list-group-item list-group-item-action"
              onClick={() => navigate("/profile")}
            >
              Ver perfil
            </li>
            <li
              className="list-group-item list-group-item-action"
              onClick={() => navigate("/settings")}
            >
              Configuración
            </li>
            <li
              className="list-group-item list-group-item-action"
              onClick={() => navigate("/help")}
            >
              Ayuda
            </li>
            <li
              className="list-group-item list-group-item-action text-danger"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/");
              }}
            >
              Cerrar sesión
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;