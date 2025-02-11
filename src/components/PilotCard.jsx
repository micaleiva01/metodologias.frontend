import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function PilotCard({ pilot, onClick, user }) {
  const fullName = `${pilot.name} ${pilot.surname}`;

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (!window.confirm(`¿Estás seguro de que deseas eliminar a ${fullName}?`)) {
      return;
    }

    try {
      await axios.delete(`http://localhost:8000/pilots/${pilot.id}`);
      alert(`${fullName} ha sido eliminado.`);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting pilot:", error);
      alert("Error al eliminar el piloto. Inténtalo de nuevo.");
    }
  };


  const isTeamManager = user?.rol === "TEAM_MANAGER";
  const canManagePilot =  (isTeamManager && user?.teamName?.name === pilot.team.name);

  return (
    <div
      className="card h-100"
      style={{ cursor: "pointer", transition: "transform 0.2s" }}
      onClick={onClick}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <img
        src={pilot.imageUrl}
        className="card-img-top"
        alt={fullName}
        style={{ height: "200px", objectFit: "cover" }}
      />
      <div className="card-body text-center">
        <h5 className="card-title">{fullName}</h5>
        <p className="card-text text-muted">Dorsal: {pilot.id}</p>
        <p className="card-text text-muted">Iniciales: {pilot.initials}</p>
        <p className="card-text text-muted">Equipo: {pilot.team.name}</p>
        <p className="card-text text-muted">País: {pilot.country}</p>
        <p className="card-text text-muted">Twitter: {pilot.twitter}</p>

        {canManagePilot && (
          <div>
            <Link className="btn btn-outline-primary mt-2" to={`/pilots/edit/${pilot.id}`} onClick={(e) => e.stopPropagation()}>
              Editar
            </Link>
            <button className="btn btn-danger mx-2 mt-2" onClick={handleDelete}>
              Eliminar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PilotCard;
