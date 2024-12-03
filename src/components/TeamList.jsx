import React from 'react';
import TeamCard from './TeamCard';

const teams = [
    { id: 1, name: "Mercedes", country: "Germany", logo: "https://link-to-mercedes-logo.png" },
    { id: 2, name: "Red Bull Racing", country: "Austria", logo: "https://link-to-redbull-logo.png" },
    { id: 3, name: "Ferrari", country: "Italy", logo: "https://link-to-ferrari-logo.png" },
    { id: 4, name: "McLaren", country: "UK", logo: "https://link-to-mclaren-logo.png" },
    { id: 5, name: "Alpine", country: "France", logo: "https://link-to-alpine-logo.png" },
  ];

function TeamList() {
    return (
        <div className='team-list'>
            {teams.map((team) => (
                <TeamCard key={team.id} team={team} />
            ))}
        </div>
  );
}

export default TeamList;