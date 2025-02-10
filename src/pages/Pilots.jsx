// Pilots.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PilotList from "../components/PilotList";

function Pilots() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <div>
      <header className="pilots-header">
        <h1 className="title text-center">PILOTOS</h1>
      </header>
      <main>
        <PilotList />

        {/* solo managers */}
        {user?.rol === "TEAM_MANAGER" && (
          <Link to="pilots/create" className="btn btn-outline-danger mb-4">
            Crear un piloto nuevo
          </Link>
        )}
      </main>
    </div>
  );
}

export default Pilots;

