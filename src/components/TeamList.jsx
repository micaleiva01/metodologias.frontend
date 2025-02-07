// TeamList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import TeamCard from "./TeamCard";
import TeamDetailsModal from "./TeamDetailsModal";

function TeamList() {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [modalShow, setModalShow] = useState(false);

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
      setTeams(teams.filter((team) => team.id !== id));
    } catch (error) {
      alert("Failed to delete the team. Please try again.");
      console.error("Error deleting team:", error);
    }
  };

  useEffect(() => {
    loadTeams();
  }, []);

  const handleCardClick = (team) => {
    setSelectedTeam(team);
    setModalShow(true);
  };

  return (
    <div className="container my-4">
      <div className="row">
        {teams.map((team) => (
          <div key={team.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <TeamCard
              team={team}
              onDelete={deleteTeam}
              onClick={() => handleCardClick(team)}
            />
          </div>
        ))}
      </div>

      {/* Render the modal when a team is selected */}
      {selectedTeam && (
        <TeamDetailsModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          team={selectedTeam}
        />
      )}
    </div>
  );
}

export default TeamList;
