import React, { useEffect, useState } from "react";
import axios from "axios";
import CarCard from "./CarCard";

function CarList() {
  const [cars, setCars] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      loadCars(storedUser);
    } else {
      loadCars(null);
    }
  }, []);

  const loadCars = async (loggedUser) => {
    try {
      const result = await axios.get("http://localhost:8000/cars");
      let filteredCars = result.data;

      // If the logged-in user is a team manager, filter cars by `team id`
      if (loggedUser?.rol === "TEAM_MANAGER" && loggedUser.teamName?.id) {
        filteredCars = result.data.filter(
          (car) => car.teamName.id === loggedUser.teamName.id
        );
      }

      setCars(filteredCars);
    } catch (error) {
      alert("Error fetching cars: " + error.message);
    }
  };

  const deleteCar = async (id, teamId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this car?");
    if (!isConfirmed) {
      return;
    }

    try {
      await axios.delete(`http://localhost:8000/cars/${id}`, { params: { teamId } });
      setCars(cars.filter((car) => car.id !== id));
      alert("Car deleted successfully!");
    } catch (error) {
      alert("Failed to delete the car. Please try again.");
      console.error("Error deleting car:", error);
    }
  };

  return (
    <div className="container my-4">
      <div className="row">
        {cars.length === 0 ? (
          <p className="text-white text-center">No hay coches disponibles.</p>
        ) : (
          cars.map((car) => (
            <div key={car.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
              <CarCard car={car} onDelete={(id) => deleteCar(id, car.teamName.id)} user={user} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CarList;
