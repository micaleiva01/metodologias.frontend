import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import VotingsList from "../components/VotingsList";


function Votings() {

    const [user, setUser] = useState(null);
    
        useEffect(() => {
            const storedUser = JSON.parse(localStorage.getItem("user"));
            if (storedUser) {
                setUser(storedUser);
            }
        }, []);

    return (
     <div className="Votings">
        <header className="votings-header">
            <h1 className='title text-center'>VOTACIONES</h1>
        </header>
        <main>
             <VotingsList />

             {/*solo admins*/}
                {user?.rol === "ADMIN" && (
                    <Link to="/create-voting" className="btn btn-outline-danger mb-4">
                        Crear una votación nueva
                    </Link>
                )}
        </main>
     </div>
    );
}

export default Votings;