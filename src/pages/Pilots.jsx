import React from "react";
import PilotList from "../components/PilotList";

function Pilots() {
  return (
    <div>
        <header className="pilots-header">
            <h1 className='title text-center'>PILOTOS</h1>
        </header>
        <main>
            <PilotList />
        </main>
    </div>
  );
}

export default Pilots;
