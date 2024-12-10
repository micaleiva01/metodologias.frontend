import React from 'react';
import TeamCard from './TeamCard';

const teams = [
    { id: 1, name: "Mercedes", country: "Alemania", logo: "https://link-to-mercedes-logo.png" },
    { id: 2, name: "Red Bull Racing", country: "Austria", logo: "https://link-to-redbull-logo.png" },
    { id: 3, name: "Ferrari", country: "Italia", logo: "https://link-to-ferrari-logo.png" },
    { id: 4, name: "McLaren", country: "UK", logo: "https://link-to-mclaren-logo.png" },
    { id: 5, name: "Alpine", country: "Francia", logo: "https://link-to-alpine-logo.png" },
  ];

function TeamList() {
    return (
    <div className="container my-4">
      <div className="row">
        {teams.map((team) => (
          <div key={team.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <TeamCard team={team} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TeamList;

