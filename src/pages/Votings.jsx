import React from "react";
import VotingsList from "../components/VotingsList";


function Votings() {
    return (
     <div className="Votings">
        <header className="votings-header">
            <h1 className='title text-center'>VOTACIONES</h1>
        </header>
        <main>
             <VotingsList />
        </main>
     </div>
    );
}

export default Votings;