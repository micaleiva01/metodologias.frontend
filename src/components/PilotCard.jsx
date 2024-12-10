import React from "react";

function PilotCard({ pilot }) {
  return (
    <div className="card h-100">
      <img
        src={pilot.image}
        className="card-img-top"
        alt={`${pilot.name}`}
        style={{ height: "200px", objectFit: "cover" }}
      />
      <div className="card-body text-center">
        <h5 className="card-title">{pilot.name}</h5>
        <p className="card-text mb-1">Team: {pilot.team}</p>
        <p className="card-text text-muted">Nationality: {pilot.nationality}</p>
      </div>
    </div>
  );
}

export default PilotCard;
