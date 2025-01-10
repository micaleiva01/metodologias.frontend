import React, { useEffect, useState } from "react";
import axios from "axios";
import TeamCard from "./TeamCard";

function TeamList() {
  const [teams, setTeams] = useState([]);

  // Load all teams
  const loadTeams = async () => {
    try {
      const result = await axios.get("http://localhost:8000/teams");
      setTeams(result.data);
    } catch (error) {
      alert("Error fetching teams: " + error.message);
    }
  };

  // Delete a team
  const deleteTeam = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/teams/${id}`);
      // Update the state to remove the deleted team
      setTeams(teams.filter((team) => team.id !== id));
    } catch (error) {
      alert("Failed to delete the team. Please try again.");
      console.error("Error deleting team:", error);
    }
  };

  useEffect(() => {
    loadTeams();
  }, []);

  return (
    <div className="container my-4">
      <div className="row">
        {teams.map((team) => (
          <div key={team.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <TeamCard team={team} onDelete={deleteTeam} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TeamList;
