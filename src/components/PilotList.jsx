import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import PilotCard from './PilotCard';

function PilotList() {
  const [pilots, setPilots] = useState([]);

  useEffect(() => {
      loadPilots();
  });

  const loadPilots = async () => {
    const results = await axios.get("http://localhost:8000/pilots");
    setPilots(results.data);
  }

    return (

    <div className="container my-4">

      {/* cards */}
      <div className="row">
        {pilots.map((pilot) => (
          <div key={pilot} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <PilotCard pilot={pilot} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PilotList;
