import React from "react";
import { Link } from "react-router-dom";
import CarList from "../components/CarList";
import FuelConsumptionTool from "../components/FuelConsumptionTool";
import ErsCalculationTool from "../components/ErsCalculationTool";

function Cars() {
  return (
    <div className="Cars">
      <header className="cars-header">
        <h1 className="title text-center">COCHES</h1>
      </header>
      <main>
        <CarList />
        <Link to="/create-car" className="btn btn-outline-danger mb-4">
          Add a New Car
        </Link>
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
      </main>
    </div>
  );
}

export default Cars;