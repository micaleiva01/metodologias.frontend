import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TeamList from "../components/TeamList";
import axios from "axios";


function Teams() {
  const [user, setUser] = useState(null);
  const [teamName, setTeamName] = useState(null);
  const [cars, setCars] = useState([]);
  const [pilots, setPilots] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    console.log("User from localStorage:", storedUser);
    setUser(storedUser || null);

    if (storedUser?.rol === "TEAM_MANAGER" && storedUser.teamName?.name) {
      console.log("User is a Team Manager. Fetching team details for:", storedUser.teamName.name);
      loadTeam(storedUser.teamName.name);
    } else if (storedUser?.rol === "ADMIN" || storedUser?.rol === "USER") {
      console.log("User is an Admin/User, showing full team list.");
      setLoading(false);
    } else {
      console.log("Unknown role or no role assigned");
      setLoading(false);
    }
  }, []);



  const loadTeam = async (team) => {
    if (!team) {
      setLoading(false);
      return;
    }

    try {
      console.log(`Fetching team data for: ${team}`);
      const teamResponse = await axios.get(`http://localhost:8000/teams/${encodeURIComponent(team)}`);
      setTeamName(teamResponse.data);

      const carsResponse = await axios.get(`http://localhost:8000/cars?team=${encodeURIComponent(team)}`);
      setCars(carsResponse.data);

      const pilotsResponse = await axios.get(`http://localhost:8000/pilots`);
      const filteredPilots = pilotsResponse.data.filter((pilot) => pilot.team?.name === team);
      setPilots(filteredPilots);
      console.log("Filtered Pilots:", filteredPilots);

    } catch (error) {
      console.error("Error loading team data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2 className="text-center text-white">Cargando...</h2>;
  }

  console.log("User Role:", user?.rol);

  if (user?.rol === "TEAM_MANAGER" && teamName) {
    console.log("Rendering Team Manager view");
  
    // ✅ Filter cars belonging to the logged-in Team Manager's team
    const filteredCars = cars.filter((car) => car.teamName?.name === teamName.name);
    
    return (
      <div className="container my-4 text-white">
        <div className="text-center">
          <h1>{teamName.name}</h1>
          {teamName.logoUrl && (
            <img src={teamName.logoUrl} alt={`${teamName.name} Logo`} className="img-fluid mb-4" style={{ maxHeight: "200px" }} />
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
  
        <h2 className="mt-4">Coches</h2>
        <div className="row">
          {filteredCars.length > 0 ? (
            filteredCars.map((car) => (
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
  
        {user?.rol === "TEAM_MANAGER" && (
          <div className="d-flex justify-content-center mb-4">
            {teamName.name && (
              <Link to={`/edit-team/${encodeURIComponent(teamName.name)}`} className="btn btn-primary btn-lg px-4 py-2">
                Editar Equipo
              </Link>
            )}
          </div>
        )}
      </div>
    );
  }
  

  //admin y publico solo ven la lista, no pueden editar
  if (user?.rol !== "TEAM_MANAGER") {
    console.log("Admin/User");
    return (
      <div className="container my-4 text-white">
        <h1 className="title text-center">EQUIPOS</h1>
        <TeamList />
      </div>
    );
  }


  if (user?.rol === "TEAM_MANAGER" && !teamName) {
    return (
      <div className="container my-4 text-white text-center">
        <h2>Aún no tienes un equipo</h2>
        <p>Un Responsable de Equipo puede añadirte a uno existente o puedes crear un equipo nuevo.</p>
        <Link to="/create-team" className="btn btn-primary btn-lg me-3">
          Crear Equipo
        </Link>
        {/*<Link to="/join-team" className="btn btn-outline-light btn-lg">
          Unirse a un Equipo
        </Link>*/}
      </div>
    );
  }  
 
}

export default Teams;
