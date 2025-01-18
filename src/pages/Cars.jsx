import React from "react";
import { Link } from "react-router-dom";
import CarList from "../components/CarList";

function Cars() {
  return (
    <div className="Cars">
      <header className="cars-header">
        <h1 className="title text-center">CARS</h1>
      </header>
      <main>
        <CarList />
        <Link to="/create-car" className="btn btn-outline-danger mb-4">
          Add a New Car
        </Link>
      </main>
    </div>
  );
}
export default Cars;