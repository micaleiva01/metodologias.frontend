import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CarList from "../components/CarList";
import FuelConsumptionTool from "../components/FuelConsumptionTool";
import ErsCalculationTool from "../components/ErsCalculationTool";

function Cars() {
  
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const isTeamManager = user?.rol === "TEAM_MANAGER";
  const canAccessSimulation = user?.rol === "ADMIN" || isTeamManager;

  return (
    <div className="Cars">
      <header className="cars-header">
        <h1 className="title text-center">COCHES</h1>
      </header>
      <main>
        <CarList />

        {/* solo admins y managers */}
        {canAccessSimulation && (
          <div className="container">
            <div className="row justify-content-md-center text-light">
              <div className="col col-lg-4 border border-danger p-4 m-4">
                <FuelConsumptionTool />
              </div>
              <div className="col col-lg-4 border border-danger p-4 m-4">
                <ErsCalculationTool />
              </div>
            </div>
          </div>
        )}
        <div className="d-flex justify-content-center mb-4">
        {isTeamManager && (
          <Link to="/create-car" className="btn btn-outline-danger btn-lg px-4 py-2">
            Añadir Coche
          </Link>
        )}
        </div>
      </main>
    </div>
  );
}

export default Cars;
