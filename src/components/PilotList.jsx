import React from "react";
import PilotCard from "./PilotCard";

const pilots = [
    { id: 1, name: "Mercedes", country: "Alemania", logo: "https://link-to-mercedes-logo.png" },
    { id: 2, name: "Red Bull Racing", country: "Austria", logo: "https://link-to-redbull-logo.png" },
    { id: 3, name: "Ferrari", country: "Italia", logo: "https://link-to-ferrari-logo.png" },
    { id: 4, name: "McLaren", country: "UK", logo: "https://link-to-mclaren-logo.png" },
    { id: 5, name: "Alpine", country: "Francia", logo: "https://link-to-alpine-logo.png" },
  ];

function PilotList() {
  return (
    <div className="container my-4">
      <div className="row">
        {pilots.map((pilot) => (
          <div key={pilot.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <PilotCard pilot={pilot} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PilotList;
