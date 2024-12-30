import React from "react";
import { Link } from "react-router-dom";

function PilotCard({ pilot }) {

  const fullName = `${pilot.name} ${pilot.surname}`;

    return (
        <div className="dflex card h-100">
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
          <p className="card-text text-muted">Pais: {pilot.country}</p>
          <p className="card-text text-muted">Twitter: {pilot.twitter}</p>
          <div>
            <Link className="btn btn-outline-primary mt-2"
            to={`/edit-pilot/${pilot.id}`}>Editar</Link>
            <button className="btn btn-danger mx-2 mt-2">Eliminar</button>
          </div>
        </div>
      </div>
    );
} 

export default PilotCard;