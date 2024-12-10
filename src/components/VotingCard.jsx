import React from "react";

function VotingCard({ voting }) {
    return (
    <div className="card h-100">
      <img
        src={voting.logo}
        className="card-img-top"
        alt={`${voting.name}`}
        style={{ height: "200px", objectFit: "cover" }}
      />
      <div className="card-body text-center">
        <h5 className="card-title">{voting.name}</h5>
        <p className="card-text text-muted">{voting.description}</p>
      </div>
    </div>
    );
} 

export default VotingCard;
