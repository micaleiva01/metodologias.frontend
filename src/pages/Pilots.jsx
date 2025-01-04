import React from "react";
import { Link } from 'react-router-dom';
import PilotList from "../components/PilotList";

function Pilots() {
  return (
    <div>
        <header className="pilots-header">
            <h1 className='title text-center'>PILOTOS</h1>
        </header>
        <main>
            <PilotList />
            <Link to="/create-pilot" className="btn btn-outline-danger mb-4">
                Crear un piloto nuevo
            </Link>
        </main>
    </div>
  );
}

export default Pilots;
