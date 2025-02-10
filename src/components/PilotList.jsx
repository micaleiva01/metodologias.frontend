import React, { useEffect, useState } from "react";
import axios from "axios";
import PilotCard from "./PilotCard";
import PilotDetailsModal from "./PilotDetailsModal";

function PilotList() {
  const [pilots, setPilots] = useState([]);
  const [selectedPilot, setSelectedPilot] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      loadPilots(storedUser);
    } else {
      loadPilots(null);
    }
  }, []);

  const loadPilots = async (loggedUser) => {
    try {
      const results = await axios.get("http://localhost:8000/pilots");
      let filteredPilots = results.data;

      if (loggedUser?.rol === "TEAM_MANAGER" && loggedUser.teamName?.name) {
        filteredPilots = results.data.filter(
          (pilot) => pilot.team.name === loggedUser.teamName.name
        );
      }

      setPilots(filteredPilots);
    } catch (error) {
      console.error("Error loading pilots", error);
    }
  };

  const handleCardClick = (pilot) => {
    setSelectedPilot(pilot);
    setModalShow(true);
  };

  return (
    <div className="container my-4">
      <div className="row">
        {pilots.length === 0 ? (
          <p className="text-white text-center">No hay pilotos disponibles.</p>
        ) : (
          pilots.map((pilot) => (
            <div key={pilot.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
              <PilotCard pilot={pilot} onClick={() => handleCardClick(pilot)} user={user} />
            </div>
          ))
        )}
      </div>

      {selectedPilot && (
        <PilotDetailsModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          pilot={selectedPilot}
        />
      )}
    </div>
  );
}

export default PilotList;
