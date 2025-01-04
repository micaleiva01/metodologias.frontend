import React from "react";
import VotingsList from "../components/VotingsList";
import { Link } from "react-router-dom";


function Votings() {
    return (
     <div className="Votings">
        <header className="votings-header">
            <h1 className='title text-center'>VOTACIONES</h1>
        </header>
        <main>
             <VotingsList />
        </main>
        <Link to="/create-voting" className="btn btn-outline-danger mb-4">
            Crear una votación nueva
        </Link>
     </div>
    );
}

export default Votings;