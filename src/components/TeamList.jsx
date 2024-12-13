import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import TeamCard from './TeamCard';

/*
const TeamList = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
      const fetchTeams = async () => {
          try {
              const response = await fetch("http://localhost:8000/teams");

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

  */

  function TeamList() {
    const [teams, setTeams] = useState([]);
  
    useEffect(() => {
        loadTeams();
    });

    const loadTeams = async () => {
      const result = await axios.get("http://localhost:8000/teams");
      setTeams(result.data);
    }


      return (


      <div className="container my-4">

        {/* table 
        <table className='table border shadow'>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((user, index) => (
              <tr>
                <th scope="row" key={index}>
                  {index + 1}  
                </th>
                <td>{teams.name}</td>
                <td>{teams.logoUrl}</td>
                <td>{teams.twitter}</td>
              </tr>
            ))}
          </tbody>
        </table>
        */}

        {/* cards */}
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
