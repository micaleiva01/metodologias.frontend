import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function CarCard({ car, onDelete }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const canManageCar =
    (user?.rol === "TEAM_MANAGER" && user.teamName?.name === car.teamName?.name);

  return (
    <div 
      className="card h-100" 
      style={{ cursor: "pointer", transition: "transform 0.2s" }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <img
        src={car.imageUrl}
        className="card-img-top"
        alt={car.name}
        style={{ height: "200px", objectFit: "cover" }}
      />
      <div className="card-body text-center">
        <h5 className="card-title"> 
          {car.name}
          {/* <Link to={`/car-details/${car.id}`} className="text-decoration-none">
            {car.name}
          </Link> */}
        </h5>
        <p className="card-text text-muted">Equipo: {car.teamName.name}</p>

        {canManageCar && (
          <div>
            <Link className="btn btn-outline-primary mt-2" to={`/edit-car/${car.id}`}>
              Editar
            </Link>
            <button className="btn btn-danger mx-2 mt-2" onClick={() => onDelete(car.id, car.teamName.id)}>
              Eliminar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CarCard;
