import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TeamList from "../components/TeamList";
import axios from "axios";

function Teams() {
  const [user, setUser] = useState(null);
  const [team, setTeam] = useState(null);
  const [cars, setCars] = useState([]);
  const [pilots, setPilots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      if (storedUser.rol === "TEAM_MANAGER") {
        loadTeam(storedUser.teamName?.name);
      }
    }
  }, []);

  const loadTeam = async (teamName) => {
    if (!teamName) {
      setLoading(false);
      return;
    }

    try {
      const teamResponse = await axios.get(`http://localhost:8000/teams/${teamName}`);
      setTeam(teamResponse.data);

      const carsResponse = await axios.get("http://localhost:8000/cars");
      setCars(carsResponse.data.filter((car) => car.teamName.name === teamName));

      const pilotsResponse = await axios.get("http://localhost:8000/pilots");
      setPilots(pilotsResponse.data.filter((pilot) => pilot.team.name === teamName));
    } catch (error) {
      console.error("Error loading team data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2 className="text-center text-white">Cargando equipo...</h2>;
  }

  if (user?.rol === "TEAM_MANAGER" && team) {
    return (
      <div className="container my-4 text-white">
        <div className="text-center">
          <h1>{team.name}</h1>
          <img src={team.logoUrl} alt={`${team.name} Logo`} className="img-fluid mb-4" style={{ maxHeight: "200px" }} />
        </div>

        <h2 className="mt-4">Coches</h2>
        <div className="row">
          {cars.length > 0 ? (
            cars.map((car) => (
              <div key={car.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                <div className="card bg-transparent text-white border-white">
                  <img src={car.imageUrl} className="card-img-top" alt={car.name} style={{ height: "150px", objectFit: "cover" }} />
                  <div className="card-body text-center">
                    <h5 className="card-title">{car.name}</h5>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No hay coches en este equipo.</p>
          )}
        </div>

        <h2 className="mt-4">Pilotos</h2>
        <div className="row">
          {pilots.length > 0 ? (
            pilots.map((pilot) => (
              <div key={pilot.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                <div className="card bg-transparent text-white border-white">
                  <img src={pilot.imageUrl} className="card-img-top" alt={`${pilot.name} ${pilot.surname}`} style={{ height: "150px", objectFit: "cover" }} />
                  <div className="card-body text-center">
                    <h5 className="card-title">{pilot.name} {pilot.surname}</h5>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No hay pilotos en este equipo.</p>
          )}
        </div>
        <div className="d-flex justify-content-center mb-4">
          {team.name && (
            <Link to={`/edit-team/${team.name}`} className="btn btn-primary btn-lg px-4 py-2">
              Editar Equipo
            </Link>
          )}
        </div>
      </div>
    );
  }

  //publico
  return (
    <div className="container my-4 text-white">
      <h1 className="text-center">Todos los Equipos</h1>
      <p className="text-center">(Vista para admins y usuarios regulares)</p>
      <TeamList />
    </div>
  );
}

export default Teams;
