import React from 'react';
import { useEffect, useState } from "react";
import TeamCard from './TeamCard';


const TeamList = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
      const fetchTeams = async () => {
          try {
              const response = await fetch("http://localhost:8000/api/teams");

              if (!response.ok) {
                  throw new Error("Se ha producido un error. No se han podido encontrar los equipos.");
              }

              const data = await response.json();
              setTeams(data);
          } catch (error) {
              alert(error.message);
          }
      };

      fetchTeams();
  }, [])

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
  };

export default TeamList;
