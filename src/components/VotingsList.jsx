import React from 'react';
import VotingCard from './VotingCard';

const votings = [
    {
      id: 1,
      name: "Team A",
      votes: 42,
    },
    {
      id: 2,
      name: "Team B",
      votes: 35,
    },
    {
      id: 3,
      name: "Team C",
      votes: 20,
    },
    {
      id: 4,
      name: "Team D",
      votes: 5,
    },
  ];

function VotingsList() {
  return (
    <div className="container my-4">
      <div className="row">
        {votings.map((voting) => (
          <div key={voting.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <VotingCard voting={voting} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default VotingsList;