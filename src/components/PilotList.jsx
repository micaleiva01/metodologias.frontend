// PilotList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import PilotCard from "./PilotCard";
import PilotDetailsModal from "./PilotDetailsModal"; 

function PilotList() {
  const [pilots, setPilots] = useState([]);
  const [selectedPilot, setSelectedPilot] = useState(null);
  const [modalShow, setModalShow] = useState(false);

  const loadPilots = async () => {
    try {
      const results = await axios.get("http://localhost:8000/pilots");
      setPilots(results.data);
    } catch (error) {
      console.error("Error loading pilots", error);
    }
  };

  useEffect(() => {
    loadPilots();
  }, []);

  const handleCardClick = (pilot) => {
    setSelectedPilot(pilot);
    setModalShow(true);
  };

  
  return (
    <div className="container my-4">
      {/* Cards */}
      <div className="row">
        {pilots.map((pilot) => (
          <div key={pilot.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <PilotCard pilot={pilot} onClick={() => handleCardClick(pilot)} />
          </div>
        ))}
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
