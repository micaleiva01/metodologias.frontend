import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/login");
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) {
    return <p className="text-white text-center mt-5">Cargando...</p>; // Prevents the error
  }

  return (
    <div className="container m-5 text-white text-center">
      <h1>Bienvenido, {user.name}!</h1>
      {user.rol === "ADMIN" ? (
        <div>
          <h3>¿Qué deseas hacer?</h3>
          <div className="d-flex flex-column align-items-center">
            <button className="btn btn-primary mb-2">Gestionar Usuarios</button>
            <button className="btn btn-primary mb-2">Gestionar Noticias</button>
            <button className="btn btn-primary mb-2">Gestionar Carreras</button>
            <button className="btn btn-primary mb-2">Gestionar Circuitos</button>
          </div>
          <button className="btn btn-danger mt-3" onClick={handleLogout}>
            Cerrar Sesión
          </button>
        </div>
      ) : (
        <div>
          <h3>¿Qué deseas hacer?</h3>
          <div className="d-flex flex-column align-items-center">
            <button className="btn btn-primary mb-2">Gestionar Pilotos</button>
            <button className="btn btn-primary mb-2">Gestionar Autos</button>
          </div>
          <button className="btn btn-danger mt-3" onClick={handleLogout}>
            Cerrar Sesión
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;