import React from "react";
import { Link } from "react-router-dom";
import TeamList from "../components/TeamList";


function Teams() {
  return (
    <div className="Teams">
      <header className="teams-header">
        <h1 className="title text-center">EQUIPOS</h1>
      </header>
      <main>
        <TeamList />
        <Link to="/create-team" style={{ textDecoration: "underline", color: "white" }}>
          Crear un nuevo equipo
        </Link>
      </main>
    </div>
  );
}

export default Teams;
