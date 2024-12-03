import React from "react";

function TeamCard({ team }) {
    return (
        <div className='team-card'>
            <img src={team.logo} alt="logo" className="team-logo" />
            <h2>{team.name}</h2>
            <p>Pais de Origen:{team.country}</p>
        </div>
    );
} 

export default TeamCard;