import React from "react";

function TeamCard({ team }) {
    return (
        <div className="card h-100">
        <img
          src={team.image}
          className="card-img-top"
          alt={`${team.name}`}
          style={{ height: "200px", objectFit: "cover" }}
        />
        <div className="card-body text-center">
          <h5 className="card-title">{team.name}</h5>
          <p className="card-text text-muted">Pais: {team.country}</p>
        </div>
      </div>
    );
} 

export default TeamCard;
